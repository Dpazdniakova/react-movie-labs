import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";


const Paginator = ({ count, page, onChange, disabled }) => {
  if (count <= 1) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
      <Pagination
        count={count}
        page={page}
        onChange={(event, value) => onChange(value)}
        disabled={disabled}
        color="primary"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
      />
    </Box>
  );
};

export default Paginator;
