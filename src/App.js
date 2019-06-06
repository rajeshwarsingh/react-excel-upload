import React, {useCallback} from 'react'
import logo from './logo.svg';
import './App.css';
import Upload from './components/upload'
import SpreadsheetComponent  from 'react-spreadsheet-component'

class  App extends React.Component{

  constructor(props) {
    super(props);
       // Don't do this!
       this.state = {rows: []}
      }

      getFileData = (data) => {
        console.log('df',data);
        this.setState({rows: data})
      }

    Rows=(data)=>{
        return data.map((rowItem,index)=>{
          if(index===0){
            return (<tr key={index}>{this.ColumnsHeader(rowItem)}</tr>)
          }else {
            return (<tr key={index}>{this.Columns(rowItem)}</tr>)
          }

        })
      }

    Columns =(row)=>{
        return Object.keys(row).map((tdItem, index)=>{
          return <td key={index}>{row[tdItem]}</td>
      })
    }

    ColumnsHeader =(row)=>{
      return Object.keys(row).map((tdItem, index)=>{
        return <th key={index}>{row[tdItem]}</th>
    })
  }

   style = {
      width: 100
    }


  render(){



    return (
    <div className="App">
      <div><Upload getFileData={this.getFileData}>Upload</Upload></div>
      <div>*****************</div>
      <table style={{width: '100%'}} border="1">{this.Rows(this.state.rows)}</table>
    </div>
  )}
}

export default App;
