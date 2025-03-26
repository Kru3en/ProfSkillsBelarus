import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sljojsiywriewaprpyme.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY|| 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsam9qc2l5d3JpZXdhcHJweW1lIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjk4MTYwMSwiZXhwIjoyMDU4NTU3NjAxfQ.SsyE0oPQtdK4s7k-jdg0QfW6xGz9ZjD4mGiAJ5ViLvg';

export const supabase = createClient(supabaseUrl, supabaseKey);