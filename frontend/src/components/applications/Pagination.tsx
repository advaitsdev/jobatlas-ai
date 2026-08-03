type Props = {
  page: number;
  pages: number;
  setPage: (page: number) => void;
};

export default function Pagination({
  page,
  pages,
  setPage,
}: Props) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="rounded-md border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        ← Previous
      </button>

      <p className="text-sm text-muted-foreground">
        Page {page} of {pages}
      </p>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === pages}
        className="rounded-md border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  );
}