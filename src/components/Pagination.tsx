interface PaginationProps {
  totalCount: number;
  pageSize: number;
  selectedPage: number;
  onPageSelect: (page: number) => void;
}

export const PAGE_SIZE = 6;

export function paginate<T>(
  items: T[],
  pageSize: number,
  selectedPage: number
): T[] {
  const startIndex = pageSize * (selectedPage - 1);
  const endIndex = pageSize * selectedPage;
  return items.slice(startIndex, endIndex);
}

export default function Pagination({
  totalCount,
  pageSize,
  selectedPage,
  onPageSelect,
}: PaginationProps) {
  const pageCount = Math.ceil(totalCount / pageSize);
  if (pageCount <= 1) return null;

  const pages: number[] = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-5">
      <div className="join">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageSelect(page)}
            className={`join-item btn ${
              selectedPage === page ? "btn-active" : ""
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
