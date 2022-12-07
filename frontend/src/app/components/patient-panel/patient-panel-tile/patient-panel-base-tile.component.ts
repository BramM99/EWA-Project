import {Component, Input, OnInit, Output, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-patient-panel-tile',
  templateUrl: './patient-panel-base-tile.component.html',
  styleUrls: ['./patient-panel-base-tile.component.css']
})
export class PatientPanelBaseTileComponent implements OnInit {

  @Input() templateRef: TemplateRef<any>;

  constructor() {

  }

  ngOnInit(): void {
  }

}
