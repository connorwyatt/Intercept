import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { InCard } from '../../../components/InCard/InCard.component';
import { InTable } from '../../../components/InTable/InTable.component';
import { InHttp } from '../../../services/InHttp';
import { IInTableField } from '../../../components/InTable/IInTableField';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-rules-list',
  templateUrl: 'InRulesList.html',
  styleUrls: [
    '../../../styles/core.css',
    '../../../components/InCard/InCard.css',
    '../../../components/InGrid/InGrid.css',
    '../../../components/InButton/InButton.css',
    'InRulesList.css'
  ],
  encapsulation: ViewEncapsulation.Native,
  directives: [[InCard, InTable]]
})
export class InRulesList implements OnInit {
  private http: InHttp;
  private router: Router;
  private rulesFields: Array<IInTableField> = [
    {
      fieldname: 'url',
      label: 'URL'
    },
    {
      fieldname: 'method',
      label: 'Method'
    },
    {
      fieldname: 'file',
      label: 'Filename'
    },
    {
      fieldname: 'latency',
      label: 'Latency'
    },
    {
      fieldname: 'statusCode',
      label: 'Status Code'
    }
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
