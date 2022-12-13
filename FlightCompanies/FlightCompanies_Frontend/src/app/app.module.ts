import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CustomersModule } from './customers/customers.module';
import { HomeComponent } from './home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';


import { AuthService } from './core/authentication/auth.service';
import { UserService } from './core/http/user/user.service';
import { RouterExtService } from './core/services/router.service';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatSidenavModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    CustomersModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    UserService,
    RouterExtService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
