import { PeriodicElementService } from './../../services/periodicElement.service';
import { ElementDialogComponent } from './../../shared/element-dialog/element-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodicElement } from 'src/app/models/PeriodicElement';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[PeriodicElementService]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table:MatTable<any>;

  displayedColumns: string[] = ['id', 'nome', 'numeroConta', 'agencia',  'chequeEspecialLiberado','saldo', 'chequeEspecial', 'taxa','actions'];

  dataSource : PeriodicElement[];

  constructor(
    public dialog: MatDialog,
    public periodicElementService : PeriodicElementService
    ) {
      this.periodicElementService.getElements()
        .subscribe((data:PeriodicElement[]) => {
          this.dataSource = data;
        })
  }

  ngOnInit(): void {}

  openDialog(element: PeriodicElement | null):void{
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '300px',
      data: element === null ? {
        id: null,
        nome:'',
        numeroConta:'',
        agencia:'',
        chequeEspecialLiberado:false,
        saldo:null,
        chequeEspecial:null,
        taxa:null
      } : {
        id: element.id,
        nome:element.nome,
        numeroConta:element.numeroConta,
        agencia:element.agencia,
        chequeEspecialLiberado:element.chequeEspecialLiberado,
        saldo:element.saldo,
        chequeEspecial:element.chequeEspecial,
        taxa:element.taxa
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if(this.dataSource.map(p => p.id).includes(result.id)){
          this.periodicElementService.editElements(result)
            .subscribe((data:PeriodicElement) => {
              const id = this.dataSource.findIndex(p => p.id === data.id);
              this.dataSource[id] = data;
              this.table.renderRows();
            })
        }else{
          this.periodicElementService.createElements(result)
            .subscribe((data: PeriodicElement)=>{
              this.dataSource.push(data);
              this.table.renderRows();
            })
        }
      }
    });
  }

  editElement(element: PeriodicElement): void {
    this.openDialog(element);
  }

  deleteElement(id: number): void {
    this.periodicElementService.deleteElements(id)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p.id !== id);
      })
  }
}
