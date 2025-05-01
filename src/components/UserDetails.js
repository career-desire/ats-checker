import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const columns = ['S.No', 'Name', 'Job Role', 'Email', 'Mobile', 'LinkedIn', 'Portfolio', 'Created At'];

function createData(SNo, Name, JobRole, Email, Mobile, LinkedIn, Portfolio, CreatedAt) {
  return { SNo, Name, JobRole, Email, Mobile, LinkedIn, Portfolio, CreatedAt};
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dbData, setDbData] = React.useState([]);

  const rows = [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    async function fetchResumeTexts() {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/resume-reports`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const responseData = await response.json();
        setDbData(responseData.trim());
      } catch (error) {
        console.error("There was a problem fetching the resume texts:", error);
      }
    }
  
    fetchResumeTexts();

    {dbData.map((item, index) => {
      const parsedText = JSON.parse(item.text);
      rows.push
      (
        createData
        (
          index + 1, 
          parsedText.checkList.name || "N/A", 
          parsedText.checkList.jobRole || "N/A",
          parsedText.checkList.email || "N/A",
          parsedText.checkList.number || "N/A",
          parsedText.checkList.linkedIn || "N/A",
          parsedText.checkList.portfolio || "N/A",
          new Date(item.createdAt).toLocaleString()
        ))
    })}

  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
