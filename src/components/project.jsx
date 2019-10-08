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

export default function Project() {

  const [data, setData] = useState([]);
  // const [temp, setTemp] =useState();
 const getData=()=>{
    axios
    .get("http://localhost:8081/defect/api/v1/project")
    .then(result => setData(result.data));
  }
  useEffect(() => {
    axios
      .get("http://localhost:8081/defect/api/v1/project")
      .then(result => setData(result.data));
  }, []);

  console.log(data);
    
    const classes = useStyles();

  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'projectname' },
      { title: 'Description', field: 'projectdesc' },

    ],
    // data

  });

  return (<div className={classes.content}>
    <MaterialTable
      title="Project Details"
      columns={state.columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
//my code
axios
      .post("http://localhost:8081/defect/api/v1/project", newData)
      .then(result => {
        console.log(result);
        getData()
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

              //my code
axios
.put("http://localhost:8081/defect/api/v1/project/"+oldData.id, newData)
.then(result =>{ getData();
console.log(oldData.id )}
);

            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              // const data = [...state.data];
              // data.splice(data.indexOf(oldData), 1);
              // setState({ ...state, data });
              axios
.delete("http://localhost:8081/defect/api/v1/project/"+oldData.id)
.then(result => {getData();
  console.log(result)});
              
            }, 600);
          }),
      }}
    />
    </div>
  );
}

