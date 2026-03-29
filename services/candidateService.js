import { supabase } from "@/lib/supabaseClient";

export const getCandidates = async () => {
    return await supabase.from("candidates").select("*").order("created_at", { ascending: false });
};

export const addCandidate = async (data) => {
    return await supabase.from("candidates").insert([data]);
};

export const deleteCandidate = async (id) => {
    return await supabase.from("candidates").delete().eq("id", id);
};

export const updateCandidate = async (id, data) => {
    return await supabase.from("candidates").update(data).eq("id", id);
};