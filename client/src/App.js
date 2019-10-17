import React,{Component}from 'react';
import './App.css';
import Customer from './Components/Customer'
import CustomerAdd from './Components/CustomerAdd'
import CustomerDel from './Components/CustomerDel'

// material UI
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

// rolding UI
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root : {
    width : '100%',
    marginTop : theme.spacing.unit * 3,
    overflowX : "auto"
  },
  table : {
    minWidth : 1080
  },
  progress : {
    margin : theme.spacing.unit * 2
  },
})

// 하드코딩 제거
// const customers=[
//   {
//   'id' : 1,
//   'image' : 'http://placeimg.com/64/64/1',
//   'name' : '홍길동1',
//   'birthday' : '960720',
//   'gender' : '남자',
//   'job' : '학생'
// },
// {
//   'id' : 2,
//   'image' : 'http://placeimg.com/64/64/2',
//   'name' : '홍길동2',
//   'birthday' : '960720',
//   'gender' : '남자',
//   'job' : '프로그래머'
// },
// {
//   'id' : 3,
//   'image' : 'http://placeimg.com/64/64/3',
//   'name' : '홍길동3',
//   'birthday' : '960720',
//   'gender' : '남자',
//   'job' : '디자이너'
// }
// ]

/*
  React library Component 호출 순서

  1) constructor()

  2) componentWillMount()

  3) render()

  4) compoenentDidMount()
*/

/* 
  props or state 가 업데이트 되는 경우에는
  shouldCompoentUpdate() 함수를 호출하여 실질적으로 다시 render()함수를 호출하여 화면에 출력한다.
*/
class App extends Component {

  constructor(props) {
    super(props);
    this.state= {
      customers : '',
      completed : 0
    }
  }

  stateRefresh = () =>{
    this.setState({
      customers : '',
      completed : 0
    });
    this.callApi().then(res => this.setState({customers:res})).catch(err => console.log(err));
  }

  componentDidMount(){ 
    this.timer = setInterval(this.progress, 20);
    this.callApi().then(res => this.setState({customers:res})).catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed : completed >= 100 ? 0 : completed + 1 })
  }
render(){
  const { classes } = this.props;
  return(
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>설정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ?
            this.state.customers.map(c => { return (<Customer stateRefresh={this.stateRefresh} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>)})
            : <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
            </TableRow> }
          </TableBody>
        </Table>

        {/* 반복문의 필요성 */}
      
        {/* <Customer id={customers[0].id} image={customers[0].image} name={customers[0].name} birthday={customers[0].birthday} gender={customers[0].gender} job={customers[0].job}/>
        
        <Customer id={customers[1].id} image={customers[1].image} name={customers[1].name} birthday={customers[1].birthday} gender={customers[1].gender} job={customers[1].job}/>

        <Customer id={customers[2].id} image={customers[2].image} name={customers[2].name} birthday={customers[2].birthday} gender={customers[2].gender} job={customers[2].job}/> */}
      
      </Paper>
      <CustomerAdd stateRefresh={this.stateRefresh}/>
    </div>
  );
}
}

export default withStyles(styles)(App);
