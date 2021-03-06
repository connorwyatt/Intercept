import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, RouterOutlet } from '@angular/router-deprecated';
import { InRulesList } from './InRulesList/InRulesList';
import { InRulesDetails } from './InRulesDetails/InRulesDetails';

@Component({
  selector: 'in-rules',
  template: '<router-outlet></router-outlet>',
  encapsulation: ViewEncapsulation.Native,
  directives: [[RouterOutlet]]
})
@RouteConfig([
  { path: '', name: 'List', component: InRulesList, useAsDefault: true },
  { path: '/:ruleId', name: 'Details', component: InRulesDetails }
])
export class InRules {
}
