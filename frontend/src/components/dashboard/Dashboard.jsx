import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Chart from './Chart';
// import Dnd from './Calendar';
import Chat from '../chat/chat';
import Task from '../task/task';
import { connect } from "react-redux";
import { fetchUserProjects, fetchProject, fetchProjects } from '../../actions/projectActions';
import LoadingContainer from "../util/LoadingContainer";
import { openModal } from "../../actions/modalActions";
import dashboardGif from '../../assets/images/dashboard.gif'
import { FcTodoList, FcCheckmark  } from 'react-icons/fc';

const Dashboard = (props) => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    props.fetchUserProjects(props.currentUserId).finally(() => setIsLoading(false));
  }, []);

  // if (!props.project) {
  //   openModal('createProject')
  // }
  // else {
  //   return null;
  // }

  // useEffect(() => {
  //   const intervalId = setTimeout(() => setIsLoading(isLoading), 1000);

  //   return () => {
  //     clearTimeout(intervalId);
  //   }
  // }, []);

  const data = [
    {
      heading: "Dashboard",
      body: <Task project={props.project}/>,
    },
    {
      heading: "Calendar",
      body: "Calendar content",
    },
    // {
    //   heading: "Group Channel",
    //   body: <Chat />,
    // },
  ];

  const [info, setInfo] = useState({
    data
  })
  
  let progressChart;
  
  const content = () => {
    return (
      <div className="dashboard-container">
        <Tabs className="tab-component">
          <TabList>
            {data.map(({ heading }, i) => (
              <Tab key={i}>
                {heading}
                {i === 0 ? progressChart = <Chart /> : null}
                {/* {console.log(`${i}`)}
                {console.log(`${heading}`)} */}
              </Tab>
            ))}
          </TabList>
          
          <div className="main-content-container">
            <div className="left-content">
              <div className="task-container">
                <ul>
                  <span><FcTodoList id="todo-icon" size={30} />TO DO:</span>
                    <ol>Task 1 <FcCheckmark /></ol>
                    <ol>Task 2  <FcCheckmark /></ol>
                    <ol>Task 3  <FcCheckmark /></ol>
                    <ol>Task 4  <FcCheckmark /></ol>
                    <ol>Task 5  <FcCheckmark /></ol>
                </ul>
              </div>
          
              <div className="chart-container">
                {progressChart}
                {/* {console.log('Chart will render')} */}
              </div>
            </div>
          
          {!props.project ? 
            <div className="right-content-dashboard">  
              <p>Uhh-ohh..Select/Create a Project first!</p> 
              <img id="dashboard-gif" src={dashboardGif} alt="" /> 
            </div>: 
            <div className="right-content">
              {data.map(({ body }, i) => (
                <TabPanel key={i}>
                  {body}
                </TabPanel>
              ))}
            </div>
            }

          </div>
        </Tabs>

        <>
          <Chat />
        </>
      </div>
    )
  }


return isLoading ? <LoadingContainer /> : content() 
}
const mapStateToProps = (state, ownProps) => {
  const project = state.entities.projects[ownProps.location.pathname.split("/")[3]]
  
  if (!project) {
    
  }
  return {
    userProjects: Object.values(state.entities.projects),
    currentUserId: state.session.user.id,
    project: state.entities.projects[ownProps.location.pathname.split("/")[3]]
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUserProjects: (userId) => dispatch(fetchUserProjects(userId)),
  fetchProject: (projectId) => dispatch(fetchProject(projectId)),
  fetchProjects: () => dispatch(fetchProjects())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));