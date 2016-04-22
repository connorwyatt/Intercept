import { Component, ViewEncapsulation, OnInit } from 'angular2/core';
import { InCard } from '../../components/InCard/InCard.component';
import { InTable } from '../../components/InTable/InTable.component';
import { InHttp } from '../../services/InHttp';
import { IInTableField } from '../../components/InTable/IInTableField';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-rules',
  templateUrl: 'InRules.html',
  styleUrls: [
    '../../styles/core.css',
    '../../components/InCard/InCard.css',
    '../../components/InGrid/InGrid.css',
    'InRules.css'
  ],
  encapsulation: ViewEncapsulation.Native,
  directives: [[InCard, InTable]]
})
export class InRules implements OnInit {
  private http: InHttp;
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

  constructor(http: InHttp) {
    this.http = http;
  }

  ngOnInit() {
    this.http.get('/rules')
      .subscribe((data) => {
        this.rules = data.data.Rule;
        this.rulesResolved = true;
      });
  }
}
