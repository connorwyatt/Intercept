import { Component, ViewEncapsulation } from 'angular2/core';
import { NgForm } from 'angular2/common';
import { RouteParams, OnActivate, Router } from 'angular2/router';
import { InCard } from '../../../components/InCard/InCard.component';
import { IN_INPUTS } from '../../../components/InInput/InInputs';
import { InRequiredValidator } from '../../../directives/InRequiredValidator/InRequiredValidator.directive';
import { InHttp } from '../../../services/InHttp';
import { InMessagesHelper } from '../../../services/InMessagesHelper';
import { IInSelectOption } from '../../../interfaces/IInSelectOption';
import { IInMessage } from '../../../interfaces/IInMessage';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-rules-details',
  templateUrl: 'InRulesDetails.html',
  styleUrls: [
    '../../../styles/core.css',
    '../../../components/InCard/InCard.css',
    '../../../components/InGrid/InGrid.css',
    '../../../components/InForm/InForm.css',
    '../../../components/InButton/InButton.css'
  ],
  encapsulation: ViewEncapsulation.Native,
  directives: [[IN_INPUTS, InCard, InRequiredValidator]]
})
export class InRulesDetails implements OnActivate {
  private http: InHttp;
  private router: Router;
  private routeParams: RouteParams;
  private messagesHelper: InMessagesHelper;
  private rule: Object;
  private messages: Array<IInMessage>;
  private ruleResolved: boolean;
  private methods: Array<IInSelectOption> = [
    { id: 'GET', value: 'GET' },
    { id: 'PUT', value: 'PUT' },
    { id: 'POST', value: 'POST' },
    { id: 'DELETE', value: 'DELETE' }
  ];
  private types: Array<IInSelectOption> = [
    { id: 'application/json', value: 'JSON' },
    { id: 'plain/text', value: 'Plain Text' }
  ];

  private get isNew(): boolean {
    return this.routeParams.get('ruleId') === 'new';
  }

  constructor(http: InHttp,
              router: Router,
              routeParams: RouteParams,
              messagesHelper: InMessagesHelper) {
    this.http = http;
    this.router = router;
    this.routeParams = routeParams;
    this.messagesHelper = messagesHelper;
  }

  routerOnActivate() {
    let ruleId: string = this.isNew ? 'resourcetemplate' : this.routeParams.get('ruleId');

    this.http.get(`/rules/${ruleId}`)
      .subscribe((data) => {
        this.rule = data.data.Rule;
        this.ruleResolved = true;
      });
  }

  private onSubmit(form: NgForm): void {
    if (this.isNew) {
      this.http.post('/rules', form.value)
        .subscribe((data) => {
          this.router.navigate(['Details', { ruleId: data.data.Rule.id }]);
        });
    } else {
      this.http.put(`/rules/${this.routeParams.get('ruleId')}`, form.value)
        .subscribe((data) => {
          this.rule = data.data.Rule;
          this.messages = this.messagesHelper.flattenMessages(this.messagesHelper.getSaveMessage());
        });
    }
  }

  private onDelete() {
    this.http.delete(`/rules/${this.routeParams.get('ruleId')}`)
      .subscribe(() => {
        this.router.navigate(['List']);
      });
  }
}
