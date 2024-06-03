import MaterialTable, { Column } from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

type Props = {
  title: string;
  columns: Column<object>[];
  data: object[];
};

const Table = ({ title, columns, data }: Props) => {
  const defaultMaterialTheme = createTheme();
  const tableIcons = {
    Add: forwardRef<SVGSVGElement, unknown>((props, ref) => (
      <AddBox {...props!} ref={ref} />
    )),
    Check: forwardRef<SVGSVGElement, unknown>((props, ref) => (
      <Check {...props!} ref={ref} />
    )),
    Clear: forwardRef<SVGSVGElement, unknown>((props, ref) => (
      <Clear {...props!} ref={ref} />
    )),
    Delete: forwardRef<SVGSVGElement, unknown>((props, ref) => (
      <DeleteOutline {...props!} ref={ref} />
    )),
    DetailPanel: forwardRef<SVGSVGElement, unknown>((props, ref) => (
      <ChevronRight {...props!} ref={ref} />
    )),
    Edit: forwardRef<SVGSVGElement, unknown>((props, ref) => (
      <Edit {...props!} ref={ref} />
    )),
    Export: forwardRef<SVGSVGElement, unknown>((props, ref) => (
      <SaveAlt {...props!} ref={ref} />
    )),
    Filter: forwardRef<SVGSVGElement, unknown>((props, ref) => (
      <FilterList {...props!} ref={ref} />
    )),
    FirstPage: forwardRef<SVGSVGElement, unknown>((props, ref) => (
      <FirstPage {...props!} ref={ref} />
    )),
    LastPage: forwardRef<SVGSVGElement, unknown>((props, ref) => (
      <LastPage {...props!} ref={ref} />
    )),
    NextPage: forwardRef<SVGSVGElement, unknown>((props, ref) => (
      <ChevronRight {...props!} ref={ref} />
    )),
    PreviousPage: forwardRef<SVGSVGElement, unknown>((props, ref) => (
      <ChevronLeft {...props!} ref={ref} />
    )),
    ResetSearch: forwardRef<SVGSVGElement, unknown>((props, ref) => (
      <Clear {...props!} ref={ref} />
    )),
    Search: forwardRef<SVGSVGElement, unknown>((props, ref) => (
      <Search {...props!} ref={ref} />
    )),
    SortArrow: forwardRef<SVGSVGElement, unknown>((props, ref) => (
      <ArrowDownward {...props!} ref={ref} />
    )),
    ThirdStateCheck: forwardRef<SVGSVGElement, unknown>((props, ref) => (
      <Remove {...props!} ref={ref} />
    )),
    ViewColumn: forwardRef<SVGSVGElement, unknown>((props, ref) => (
      <ViewColumn {...props!} ref={ref} />
    )),
  };

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={data || []}
        title={title}
        localization={{
          pagination: {
            labelDisplayedRows: '{from}-{to} de {count}',
            labelRowsSelect: 'linhas',
            labelRowsPerPage: 'Linhas por página:',
            firstAriaLabel: 'Primeira página',
            firstTooltip: 'Primeira página',
            previousAriaLabel: 'Página anterior',
            previousTooltip: 'Página anterior',
            nextAriaLabel: 'Próxima página',
            nextTooltip: 'Próxima página',
            lastAriaLabel: 'Última página',
            lastTooltip: 'Última página',
          },
          toolbar: {
            searchPlaceholder: 'Pesquisar',
          },
        }}
      />
    </ThemeProvider>
  );
};

export default Table;
