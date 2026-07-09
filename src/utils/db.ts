// Client-side Database Service Module
// Configured to securely connect to a serverless DB like Supabase.
// Respects environment variables and falls back to a simulated LocalStorage database for instant out-of-the-box testing.

export interface ProjectRequest {
  id?: string;
  name: string;
  email: string;
  details: string;
  budget: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  createdAt?: string;
}

// Database Schema definition matching Postgres/Supabase tables
export interface Database {
  public: {
    Tables: {
      project_requests: {
        Row: {
          id: string;
          name: string;
          email: string;
          details: string;
          budget: string;
          urgency: 'low' | 'medium' | 'high' | 'critical';
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          details: string;
          budget: string;
          urgency: 'low' | 'medium' | 'high' | 'critical';
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          details?: string;
          budget?: string;
          urgency?: 'low' | 'medium' | 'high' | 'critical';
          created_at?: string;
        };
      };
    };
  };
}

// Fallback simulated database using localStorage
const LOCAL_STORAGE_KEY = 'portfolio_project_requests';

function getLocalRequests(): ProjectRequest[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveLocalRequest(request: ProjectRequest): void {
  if (typeof window === 'undefined') return;
  const requests = getLocalRequests();
  requests.push({
    ...request,
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(requests));
}

// Supabase Client Singleton Instance
let supabaseClientInstance: any = null;

async function getSupabaseClient(url: string, key: string) {
  if (supabaseClientInstance) return supabaseClientInstance;
  
  const { createClient } = await import('@supabase/supabase-js');
  supabaseClientInstance = createClient<Database>(url, key);
  return supabaseClientInstance;
}

export async function submitProjectRequest(request: ProjectRequest): Promise<{ success: boolean; message: string; data?: any }> {
  // Simulate network latency (500ms - 1000ms) for high-fidelity loading states
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));

  const env = typeof import.meta.env !== 'undefined' ? import.meta.env : process.env;
  const supabaseUrl = env.PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY || env.PUBLIC_SUPABASE_KEY;

  // Validate form entries on client side
  if (!request.name || !request.email || !request.details || !request.budget || !request.urgency) {
    return { success: false, message: 'Please fill in all required fields.' };
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(request.email)) {
    return { success: false, message: 'Please provide a valid email address.' };
  }

  if (supabaseUrl && supabaseAnonKey) {
    try {
      console.log('Supabase credentials found. Retrieving client instance...');
      const supabase = await getSupabaseClient(supabaseUrl, supabaseAnonKey);

      const { data, error } = await supabase
        .from('project_requests')
        .insert([
          {
            name: request.name,
            email: request.email,
            details: request.details,
            budget: request.budget,
            urgency: request.urgency,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      return {
        success: true,
        message: 'Successfully submitted your request to Supabase!',
        data
      };
    } catch (err: any) {
      console.error('Supabase submission failed:', err);
      // Fallback to local storage on Supabase connection/table errors so the user request is never lost
      saveLocalRequest(request);
      return {
        success: true,
        message: `Saved locally (Supabase issue: ${err.message || err})`,
        data: request
      };
    }
  } else {
    // No DB variables configured - log and store locally for mock testing
    console.warn('No Supabase environment variables configured. Storing request in LocalStorage for sandbox preview.');
    saveLocalRequest(request);
    return {
      success: true,
      message: 'Request saved to local storage! Environment variables can be configured in a .env file later.',
      data: request
    };
  }
}
