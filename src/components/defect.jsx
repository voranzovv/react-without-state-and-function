import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios';



const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        paddingLeft: theme.spacing(40),
        paddingRight: theme.spacing(10),
        paddingTop: theme.spacing(10),
      },
    }));

export default function Defect() {
    const classes = useStyles();

    const [data, setData] = useState([]);
    // const [temp, setTemp] =useState();

    const getData=()=>{
      axios
      .get("http://localhost:8081/defect/api/v1/defect")
      .then(result => setData(result.data));
      
    }
  
    useEffect(() => {
      axios
        .get("http://localhost:8081/defect/api/v1/defect")
        .then(result => setData(result.data));
    }, []);

  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'defect' },
      { title: 'Description', field: 'defectdesc' },

    ],
    data
  });

  return (<div className={classes.content}>
    <MaterialTable
      title="Defect Details"
      columns={state.columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              // const data = [...state.data];
              // data.push(newData);
              // setState({ ...state, data });
              axios.post("http://localhost:8081/defect/api/v1/defect",newData)
              .then(result=>{
                console.log(result);
                getData();
              })
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              // const data = [...state.data];
              // data[data.indexOf(oldData)] = newData;
              // setState({ ...state, data });
              axios.put("http://localhost:8081/defect/api/v1/defect/"+oldData.id,newData)
              .then(result=>{
                console.log(result);
                getData();
              })
              
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              // const data = [...state.data];
              // data.splice(data.indexOf(oldData), 1);
              // setState({ ...state, data });
              axios.delete("http://localhost:8081/defect/api/v1/defect/"+oldData.id)
              .then(result=>{
                console.log(result);
                getData();
              })
            }, 600);
          }),
      }}
    />
    </div>
  );
}
