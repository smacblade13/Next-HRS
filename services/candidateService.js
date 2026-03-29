import { supabase } from "@/lib/supabaseClient";

// GET
export const getCandidates = async () => {
    const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) console.error(error);
    return { data, error };
};

// CREATE
export const addCandidate = async (candidate) => {
    const { data, error } = await supabase
        .from("candidates")
        .insert([candidate]);

    if (error) console.error(error);
    return { data, error };
};

// DELETE
export const deleteCandidate = async (id) => {
    const { error } = await supabase
        .from("candidates")
        .delete()
        .eq("id", id);

    if (error) console.error(error);
};

// UPDATE
export const updateCandidate = async (id, updates) => {
    const { error } = await supabase
        .from("candidates")
        .update(updates)
        .eq("id", id);

    if (error) console.error(error);
};