import React, {Component} from "react";
import HeaderVmensuales from "../template/HeaderVmensuales";
import Main4 from './Main4';
import PlatosMasVendidos from "./reports/PlatosMasVendidos";
import PlatosMenosVendidos from "./reports/PlatosMenosVendidos";
import PlatosVendidosCategoria from './reports/PlatosVendidosCategoria'

class Rplatos extends Component{

    render(){
        return(
            <React.Fragment>
              <Main4 />
              <HeaderVmensuales />
              <div style={{ marginTop: 30, marginBottom: 30 }}>
                <PlatosMasVendidos />
                <hr />
                <PlatosMenosVendidos />
                <hr />
                <PlatosVendidosCategoria />
              </div>
     </React.Fragment>
      );
    }

}


export default Rplatos;