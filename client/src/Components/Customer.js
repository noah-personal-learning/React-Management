import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDel from './CustomerDel';

{/*용도 별로 구분하여 관리하는 클래스를 재 조합하여 단 하나의 클래스만 Export*/ }
class Customer extends React.Component{
    render(){
        return(
        
            // {/* <CustomerProfile name={this.props.name} id={this.props.id} image={this.props.image}/>
            // <CustomerInfo birthday={this.props.birthday} gender={this.props.gender} /> */}

            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile"/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell><CustomerDel stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        
        )
    }
}

// class CustomerProfile extends React.Component{
//     render(){
//         return(
//             <div>
//                 <img src={this.props.image} alt="profile"/>
//                 <h2>{this.props.name} ( {this.props.id} ) </h2>
//             </div>
//         )
//     }
// }

// class CustomerInfo extends React.Component{
//     render(){
//         return(
//             <div>
//             <p>{this.props.birthday}</p>
//             <p>{this.props.gender}</p>
//             <p> {this.props.job} </p>
//             </div>
//         )
//     }
// }

export default Customer;