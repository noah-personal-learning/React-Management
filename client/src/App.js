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

// AppBar UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


const styles = theme => ({
  root : {
    width : '100%',
    minWidth : 1080
  },
  paper : {
    marginLeft : 15,
    marginRight : 15
  },
  menu : {
    marginTop : 15,
    marginBottom : 15,
    display : 'flex',
    justifyContent : 'center'

  },
  progress : {
    margin : theme.spacing.unit * 2
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  tableHead : {
    fontSize : "1.0rem",
    color : "grey"
  }
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
      completed : 0,
      searchKeyword : ''
    }
  }

  stateRefresh = () =>{
    this.setState({
      customers : '',
      completed : 0,
      searchKeyword : ''
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

  handleValueChange = (e) =>{
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }



render(){

  const filteredComponent = (data) => {
    data = data.filter((c) => {
      return c.name.indexOf(this.state.searchKeyword) > -1 ;
    });

    return data.map((c) => {
      return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}></Customer>
    });
  }

  const { classes } = this.props;
  const cellList = ["번호", "이미지", "이름", "생년월일", "성별", "직업", "설정"];
  return(
    <div  className={classes.root}>
      {/* App Bar */ }
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            고객관리시스템
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="검색"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              name="searchKeyword"
              value={this.state.searchKeyword}
              onChange={this.handleValueChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      
      <div className={classes.menu}>
      <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>

      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {cellList.map(c => {
                return <TableCell className={classes.tableHead}>{c}</TableCell>
              })}
              
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ?
              filteredComponent(this.state.customers) : <TableRow>
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
      
    </div>
  );
}
}

export default withStyles(styles)(App);
