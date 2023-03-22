import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Oficina } from 'src/app/core/modelos/oficina.model';
import { Rol } from 'src/app/core/modelos/rol.model';

import { OficinaService } from 'src/app/core/servicios/catalogos/oficina.servise';
import { RolService } from 'src/app/core/servicios/catalogos/rol.service';


let dataRol: Rol;

@Component({
  selector: 'app-oficina',
  templateUrl: './oficina.component.html',
  styleUrls: ['./oficina.component.css']
})
export class OficinaComponent implements OnInit {
  public combo: string;
  public idUser: string;

  dataSource = new MatTableDataSource<Oficina>([]);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private oficinaService: OficinaService, private router: Router, private rolService: RolService) {
    this.combo = '';
    this.idUser = '';
    dataRol;
  }


  ngOnInit(): void {
    if (localStorage.getItem("usuario") == null) {
      alert("Inicie Sesion");
      this.router.navigate(["login"]);
    }
    this.getOficinas();
  }
  datoOficinas: any = [];
  getOficinas() {
    return this.oficinaService.getOficinas().subscribe((data: Oficina[]) => {
      this.datoOficinas = data;
    })
  };

  buscarUsuarioRol(nombreOficina: string, usuarioId: string | null) {


    this.rolService.buscarUsuarioRol({ nombreOficina, usuarioId }).subscribe((data: any) => {
      dataRol = new Rol(data.tN_ID, data.tC_Nombre)
      console.log(dataRol.TN_ID)
      if (dataRol.TC_Nombre != null) {
        localStorage.setItem('rol', dataRol.TC_Nombre);
        localStorage.setItem('oficina', nombreOficina);
        this.router.navigate(["inicio/crearreporte"]);
      }

    });


  }

  buttonOficina(): void {
    this.buscarUsuarioRol(this.combo.toString(), localStorage.getItem('id'));
  }
}
