import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { IN_INPUTS } from '../../../components/InInput/InInputs';
import { InCard } from '../../../components/InCard/InCard.component';
import { InIcon } from '../../../components/InIcon/InIcon.component';
import { InTable } from '../../../components/InTable/InTable.component';
import { InHttp } from '../../../services/InHttp';
import { IInTableField } from '../../../components/InTable/IInTableField';
import { InCollectionFilterPipe } from '../../../pipes/InCollectionFilter.pipe';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-rules-list',
  templateUrl: 'InRulesList.html',
  styleUrls: [
    '../../../styles/core.css',
    '../../../components/InGrid/InGrid.css',
    '../../../components/InButton/InButton.css',
    'InRulesList.css'
  ],
  encapsulation: ViewEncapsulation.Native,
  directives: [[IN_INPUTS, InCard, InIcon, InTable]],
  pipes: [InCollectionFilterPipe]
})
export class InRulesList implements OnInit {
  private http: InHttp;
  private router: Router;
  private rulesFields: Array<IInTableField> = [
    { fieldname: 'url', label: 'URL', width: '55%' },
    { fieldname: 'method', label: 'Method', width: '15%', centred: true },
    { fieldname: 'latency', label: 'Latency', width: '15%', centred: true },
    { fieldname: 'statusCode', label: 'Status Code', width: '15%', centred: true }
  ];
  private rules: Array<Object>;
  private rulesResolved: boolean;

  constructor(http: InHttp,
              router: Router) {
    this.http = http;
    this.router = router;
  }

  ngOnInit() {
    this.http.get('/rules')
      .subscribe((data) => {
        this.rules = data.data.Rule;
        this.rulesResolved = true;
      });
  }

  private navigateToRule(model?: Object) {
    let ruleId: string = model ? model.id : 'new';

    let instruction = this.router.generate(['Details', { ruleId: ruleId }]);

    this.router.navigateByInstruction(instruction);
  }
}
