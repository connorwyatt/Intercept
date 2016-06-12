import {
  Component,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Store } from '@ngrx/store';
import { getAllRules } from '../../../state/reducers/rulesReducer';
import { GET_RULES_SUCCESS } from '../../../state/actions/rulesActions';
import { Observable } from 'rxjs/Rx';
import { IN_INPUTS } from '../../../components/InInput/InInputs';
import { InCard } from '../../../components/InCard/InCard.component';
import { InIcon } from '../../../components/InIcon/InIcon.component';
import { InTable } from '../../../components/InTable/InTable.component';
import { InHttp } from '../../../services/InHttp';
import { InCollectionFilterPipe } from '../../../pipes/InCollectionFilter.pipe';
import { IInTableField } from '../../../components/InTable/IInTableField';
import { IInAPIData } from '../../../interfaces/IInAPIData';
import { IInRule } from '../../../interfaces/IInRule';

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
  private rulesFields: Array<IInTableField> = [
    { fieldname: 'url', label: 'URL', width: '55%' },
    { fieldname: 'method', label: 'Method', width: '15%', centred: true },
    { fieldname: 'latency', label: 'Latency', width: '15%', centred: true },
    { fieldname: 'statusCode', label: 'Status Code', width: '15%', centred: true }
  ];
  private rules: Observable<IInRule[]>;

  constructor(private _http: InHttp,
              private _router: Router,
              private _store: Store) {
    this.rules = this._store.let(getAllRules());
  }

  ngOnInit() {
    this._http.get('/rules')
      .subscribe((data: IInAPIData<IInRule[]>) => {
        this._store.dispatch({ type: GET_RULES_SUCCESS, payload: data.data['Rule'] });
      });
  }

  private navigateToRule(rule?: IInRule) {
    let ruleId: string = rule ? rule.id : 'new';

    let instruction = this._router.generate(['Details', { ruleId }]);

    this._router.navigateByInstruction(instruction);
  }
}
