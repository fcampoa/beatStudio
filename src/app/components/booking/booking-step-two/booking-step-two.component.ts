import { Component, OnInit } from '@angular/core';
import { GlobalApiService } from 'src/app/Core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Coach } from 'src/app/model/coach';
import { Horario } from 'src/app/model/horario';

@Component({
  selector: 'app-booking-step-two',
  templateUrl: './booking-step-two.component.html',
  styleUrls: ['./booking-step-two.component.scss']
})
export class BookingStepTwoComponent implements OnInit {

  constructor(private apiSvc: GlobalApiService,
    private router: Router,
    private userSv: UserService,
    private route: ActivatedRoute) {


  }
  public horario: Horario;


  public distributionType;
  public distributionType1 = [
    [
      {
        status: 'active',
        position: "1,1",
        visible: true,
        value: 1
      },
      {
        status: 'active',
        position: "1,2",
        visible: true,
        value: 2
      },
      {
        status: 'active',
        position: "1,3",
        visible: true,
        value: 3
      },
      {
        status: 'active',
        position: "1,4",
        visible: true,
        value: 4
      },
      {
        status: 'active',
        position: "1,5",
        visible: true,
        value: 5
      },
      {
        status: 'active',
        position: "1,6",
        visible: true,
        value: 6
      },
      {
        status: 'active',
        position: "1,7",
        visible: true,
        value: 7
      },
      {
        status: 'active',
        position: "1,8",
        visible: true,
        value: 8
      },
      {
        status: 'active',
        position: "1,9",
        visible: true,
        value: 9
      },
      {
        status: 'active',
        position: "1,10",
        visible: true,
        value: 10
      },

    ],

  ];

  public distributionType2 = [

    [
      {
        status: 'active',
        position: "1,1",
        visible: true,
        value: 1
      },
      {
        status: 'active',
        position: "1,2",
        visible: true,
        value: 2
      },
      {
        status: 'active',
        position: "1,3",
        visible: true,
        value: 3
      },
      {
        status: 'active',
        position: "1,4",
        visible: false,
        value: 4
      },
      {
        status: 'active',
        position: "1,5",
        visible: false,
        value: 5
      },
      {
        status: 'active',
        position: "1,6",
        visible: false,
        value: 6
      },
      {
        status: 'active',
        position: "1,7",
        visible: false,
        value: 7
      },
      {
        status: 'active',
        position: "1,8",
        visible: true,
        value: 8
      },
      {
        status: 'active',
        position: "1,9",
        visible: true,
        value: 9
      },
      {
        status: 'active',
        position: "1,10",
        visible: true,
        value: 10
      },

    ],
    [
      {
        status: 'active',
        position: "1,1",
        visible: true,
        value: 1
      },
      {
        status: 'active',
        position: "1,2",
        visible: true,
        value: 2
      },
      {
        status: 'active',
        position: "1,3",
        visible: true,
        value: 3
      },
      {
        status: 'active',
        position: "1,4",
        visible: true,
        value: 4
      },
      {
        status: 'active',
        position: "1,5",
        visible: false,
        value: 5
      },
      {
        status: 'active',
        position: "1,6",
        visible: false,
        value: 6
      },
      {
        status: 'active',
        position: "1,7",
        visible: true,
        value: 7
      },
      {
        status: 'active',
        position: "1,8",
        visible: true,
        value: 8
      },
      {
        status: 'active',
        position: "1,9",
        visible: true,
        value: 9
      },
      {
        status: 'active',
        position: "1,10",
        visible: true,
        value: 10
      },

    ],
    [
      {
        status: 'active',
        position: "1,1",
        visible: true,
        value: 1
      },
      {
        status: 'active',
        position: "1,2",
        visible: true,
        value: 2
      },
      {
        status: 'active',
        position: "1,3",
        visible: true,
        value: 3
      },
      {
        status: 'active',
        position: "1,4",
        visible: true,
        value: 4
      },
      {
        status: 'active',
        position: "1,5",
        visible: true,
        value: 5
      },
      {
        status: 'active',
        position: "1,6",
        visible: true,
        value: 6
      },
      {
        status: 'active',
        position: "1,7",
        visible: true,
        value: 7
      },
      {
        status: 'active',
        position: "1,8",
        visible: true,
        value: 8
      },
      {
        status: 'active',
        position: "1,9",
        visible: true,
        value: 9
      },
      {
        status: 'active',
        position: "1,10",
        visible: true,
        value: 10
      },

    ],
  ];

  public idHorario: any;
  public list_places=[];
  ngOnInit() {
    this.distributionType = this.distributionType2;
    this.route.params.subscribe(
      params => {
        this.idHorario = params.idHorario;
        this.getHorario();
      }
    );
  }
  /**
   * obtiene Horario
   */
  getHorario(): void {

    this.apiSvc.routes.horario.buscarByid(this.idHorario)<any>().subscribe(
      response => {
        this.horario=response.data[0];
        console.log(this.horario);
      }
    );
  }

  test(bal: any): void {
   this.list_places.push();
  }
}
