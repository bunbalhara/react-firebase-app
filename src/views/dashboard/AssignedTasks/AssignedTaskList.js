import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import AssignedTaskItem from './AssignedTaskItem'
import {withRouter} from 'react-router-dom';

const styles = {
    root:{
        width:'100%',
    },
    progressContaner:{
        display: 'flex',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        height:'100vh',
    },
    addNewProject:{
        width:'calc(100% - 20px)',
        backgroundColor:'white',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'50px',
        margin:'auto',
        marginTop:'10px',
        marginBotton:'10px',
        fontSize:'50px',
        fontWeight:'bold',
        color:'#00973e',
        textTransform:'capitalize',
        borderRadius:'4px',
        boxShadow:'0 0 4px 2px'
    }
}

const AssignedTaskList = (props) => {

    const {match} = props;

    const projectId = match.params.projectId

    useFirestoreConnect([{collection: 'reports',where:[['projectId','==', projectId],['assigned','==', true]]}])

    const reports = useSelector(state => state.firestore.ordered.reports)

    console.log(reports)
    
    return (
        <div style={styles.root}>
            {
                reports?
                <div>
                    {
                        reports.map(report=>(
                            <div key={report.id}>
                                <AssignedTaskItem report = {report} />
                            </div>
                        ))
                    }
                </div>:
                <div style={styles.progressContaner}>
                    <CircularProgress />
                </div>
            }
        </div>
    )
}

export default  withRouter(AssignedTaskList);