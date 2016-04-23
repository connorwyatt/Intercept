import { Component, ViewEncapsulation } from 'angular2/core';
import { RouteParams, OnActivate, Router } from 'angular2/router';
import { InCard } from '../../../components/InCard/InCard.component';
import { InHttp } from '../../../services/InHttp';
import { NgForm } from 'angular2/common';
import { IN_INPUTS } from '../../../components/InInput/InInputs';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'in-rules-details',
  templateUrl: 'InRulesDetails.html',
  styleUrls: [
    '../../../styles/core.css',
    '../../../components/InCard/InCard.css',
    '../../../components/InGrid/InGrid.css',
    '../../../components/InButton/InButton.css',
    'InRulesDetails.css'
  ],
  encapsulation: ViewEncapsulation.Native,
  directives: [[IN_INPUTS, InCard]]
})
export class InRulesDetails implements OnActivate {
  private http: InHttp;
  private router: Router;
  private routeParams: RouteParams;
  private rule: Object;
  private ruleResolved: boolean;
  private methods: Array<string> = ['GET', 'PUT', 'POST', 'DELETE'];
  private types: Array<string> = ['application/json', 'plain/text'];

  private get isNew(): boolean {
    return this.routeParams.get('ruleId') === 'new';
  }

  constructor(http: InHttp,
              router: Router,
              routeParams: RouteParams) {
    this.http = http;
    this.router = router;
    this.routeParams = routeParams;
  }

  routerOnActivate() {
    let ruleId: string = this.isNew ? 'resourcetemplate' : this.routeParams.get('ruleId');

    this.http.get(`/rules/${ruleId}`)
      .subscribe((data) => {
        this.rule = data.data.Rule;
        this.ruleResolved = true;
      });
  }

  private setFile(files): void {
    this.rule.file = files[0].path;
    this.rule.type = files[0].type;
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
