export function formatDateTime(iso) {
    if (!iso) return '-';
    try { return new Date(iso).toLocaleString(); }
    catch (e) { return iso; }
}