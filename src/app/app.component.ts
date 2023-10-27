import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularFramework-TotalDemo';
  actions: Array<any> = [
    {title: "Home", route:"/home", icon: "housse"},
    {title: "Products", route:"/products", icon: "search"},
    {title: "New Product", route:"/new-product", icon: "housse"},
    ]

    currentAction: any;

    setCurrentAction(action: any) {
      this.currentAction = action;
      }
}
