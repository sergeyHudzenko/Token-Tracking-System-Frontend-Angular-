import { Component, OnInit } from '@angular/core';
import { InformationService } from '../../services/information/information.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent implements OnInit {
  constructor(public informationService: InformationService) {}

  ngOnInit() {}
}
