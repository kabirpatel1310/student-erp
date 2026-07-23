import { Request, Response } from 'express';
import { supabase, supabaseAuth } from '../config/supabase';
import { loginSchema, registerSchema } from '../validators/auth.schema';
 
export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }
 
    const { email, password } = parsed.data;
 
    // supabaseAuth (anon key) — signInWithPassword REQUIRES anon key, not service role
    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });
 
    if (error || !data.user) {
      return res.status(401).json({ error: error?.message || 'Invalid credentials' });
    }
 
    // supabase (service role) — for DB query
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*, roles(name)')
      .eq('id', data.user.id)
      .single();
 
    if (userError || !userData) {
      return res.status(401).json({ error: 'User profile not found' });
    }
 
    return res.json({
      token: data.session.access_token,
      user: userData,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
 
export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }
 
    const { email, password, full_name, role, phone } = parsed.data;
 
    // admin.createUser needs service role — use supabase
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
 
    if (authError) return res.status(400).json({ error: authError.message });
 
    const { data: roleData } = await supabase
      .from('roles')
      .select('id')
      .eq('name', role)
      .single();
 
    const { error: userError } = await supabase.from('users').insert({
      id: authData.user.id,
      email,
      full_name,
      phone,
      role_id: roleData?.id,
    });
 
    if (userError) return res.status(400).json({ error: userError.message });
 
    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
 
export const logout = async (req: Request, res: Response) => {
  await supabaseAuth.auth.signOut();
  return res.json({ message: 'Logged out successfully' });
};
 
export const seedUsers = async (req: Request, res: Response) => {
  const users = req.body.users;
  const results = [];
 
  for (const user of users) {
    try {
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
      });
 
      if (authError) {
        results.push({
          email: user.email,
          status: 'failed',
          error: authError.message || JSON.stringify(authError),
        });
        continue;
      }
 
      const { data: roleData } = await supabase
        .from('roles')
        .select('id')
        .eq('name', user.role)
        .single();
 
      const { error: userError } = await supabase.from('users').insert({
        id: authData.user.id,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone || null,
        role_id: roleData?.id,
      });
 
      if (userError) {
        results.push({
          email: user.email,
          status: 'failed',
          error: userError.message || JSON.stringify(userError),
        });
        continue;
      }
 
      if (user.role === 'student' && user.department_id) {
        const { error: studentError } = await supabase.from('students').insert({
          user_id: authData.user.id,
          department_id: user.department_id,
          enrollment_number: user.enrollment_number,
          semester: user.semester,
          batch_year: user.batch_year,
          gender: user.gender || 'male',
          dob: user.dob || '2000-01-01',
        });
        if (studentError) {
          results.push({ email: user.email, status: 'failed', error: studentError.message });
          continue;
        }
      }
 
      if (user.role === 'faculty' && user.department_id) {
        const { error: facultyError } = await supabase.from('faculty').insert({
          user_id: authData.user.id,
          department_id: user.department_id,
          employee_code: user.employee_code,
          designation: user.designation || 'Lecturer',
          joining_date: user.joining_date || '2020-01-01',
        });
        if (facultyError) {
          results.push({ email: user.email, status: 'failed', error: facultyError.message });
          continue;
        }
      }
 
      results.push({ email: user.email, status: 'success' });
    } catch (err: any) {
      results.push({
        email: user.email,
        status: 'failed',
        error: err.message || String(err),
      });
    }
  }
 
  return res.json({ total: users.length, results });
};
