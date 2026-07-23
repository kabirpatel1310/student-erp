import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { createStudentSchema, updateStudentSchema } from '../validators/student.schema';

export const getStudents = async (req: Request, res: Response) => {
  try {
    const { department_id, semester, search } = req.query;

    let query = supabase
      .from('students')
      .select('*, user:users(full_name, email, phone), departments(name)')

    if (department_id) query = query.eq('department_id', department_id);
    if (semester) query = query.eq('semester', semester);
    if (search) query = query.ilike('enrollment_number', `%${search}%`);

    const { data, error } = await query;
    if (error) return res.status(400).json({ error: error.message });

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('students')
      .select('*, user:users(full_name, email, phone), departments(name)')
      .eq('id', id)
      .single();

    if (error) return res.status(404).json({ error: 'Student not found' });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const parsed = createStudentSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

    const { email, password, full_name, phone, enrollment_number, department_id, semester, batch_year, dob, gender, address, guardian_name, guardian_phone } = parsed.data;

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (authError) return res.status(400).json({ error: authError.message });

    // Get student role id
    const { data: roleData } = await supabase.from('roles').select('id').eq('name', 'student').single();

    // Insert into users table
    await supabase.from('users').insert({
      id: authData.user.id,
      email,
      full_name,
      phone,
      role_id: roleData?.id,
    });

    // Insert into students table
    const { data, error } = await supabase.from('students').insert({
      user_id: authData.user.id,
      enrollment_number,
      department_id,
      semester,
      batch_year,
      dob,
      gender,
      address,
      guardian_name,
      guardian_phone,
    }).select().single();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = updateStudentSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

    const { full_name, phone, ...studentFields } = parsed.data;

    // Update users table if name or phone changed
    if (full_name || phone) {
      const { data: student } = await supabase.from('students').select('user_id').eq('id', id).single();
      if (student) {
        await supabase.from('users').update({ full_name, phone }).eq('id', student.user_id);
      }
    }

    const { data, error } = await supabase.from('students').update(studentFields).eq('id', id).select().single();
    if (error) return res.status(400).json({ error: error.message });

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data: student } = await supabase.from('students').select('user_id').eq('id', id).single();
    if (!student) return res.status(404).json({ error: 'Student not found' });

    await supabase.from('students').delete().eq('id', id);
    await supabase.auth.admin.deleteUser(student.user_id);

    return res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
