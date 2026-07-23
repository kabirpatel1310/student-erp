import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { createFacultySchema, updateFacultySchema } from '../validators/faculty.schema';

export const getFaculty = async (req: Request, res: Response) => {
  try {
    const { department_id } = req.query;
    let query = supabase.from('faculty').select('*, users(full_name, email, phone), departments(name)')
    if (department_id) query = query.eq('department_id', department_id);
    const { data, error } = await query;
    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFacultyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('faculty')
      .select('*, users(full_name, email, phone), departments(name)')
      .eq('id', id)
      .single();
    if (error) return res.status(404).json({ error: 'Faculty not found' });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const createFaculty = async (req: Request, res: Response) => {
  try {
    const parsed = createFacultySchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

    const { email, password, full_name, phone, employee_code, department_id, designation, joining_date } = parsed.data;

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (authError) return res.status(400).json({ error: authError.message });

    const { data: roleData } = await supabase.from('roles').select('id').eq('name', 'faculty').single();

    await supabase.from('users').insert({
      id: authData.user.id,
      email,
      full_name,
      phone,
      role_id: roleData?.id,
    });

    const { data, error } = await supabase.from('faculty').insert({
      user_id: authData.user.id,
      employee_code,
      department_id,
      designation,
      joining_date,
    }).select().single();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateFaculty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = updateFacultySchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

    const { full_name, phone, ...facultyFields } = parsed.data;

    if (full_name || phone) {
      const { data: faculty } = await supabase.from('faculty').select('user_id').eq('id', id).single();
      if (faculty) {
        await supabase.from('users').update({ full_name, phone }).eq('id', faculty.user_id);
      }
    }

    const { data, error } = await supabase.from('faculty').update(facultyFields).eq('id', id).select().single();
    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteFaculty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { data: faculty } = await supabase.from('faculty').select('user_id').eq('id', id).single();
    if (!faculty) return res.status(404).json({ error: 'Faculty not found' });

    await supabase.from('faculty').delete().eq('id', id);
    await supabase.auth.admin.deleteUser(faculty.user_id);

    return res.json({ message: 'Faculty deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
