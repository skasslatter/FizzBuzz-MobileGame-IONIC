import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
    path: '',
    children: [
        {
            path: 'play',
            children: [
                {
                    path: '',
                    loadChildren: () =>
                        import('./pages/game/game.module').then(m => m.GamePageModule)
                }
            ]
        },
        {
            path: 'rules',
            children: [
                {
                    path: '',
                    loadChildren: () =>
                        import('./pages/rules/rules.module').then(m => m.RulesPageModule)
                }
            ]
        },
        {
            path: 'highscores',
            children: [
                {
                    path: '',
                    loadChildren: () =>
                        import('./pages/highscore/highscore.module').then(m => m.HighscorePageModule)
                }
            ]
        },
        {
            path: 'home',
            children: [
                {
                    path: '',
                    loadChildren: () =>
                        import('./pages/home/home.module').then(m => m.HomePageModule)
                }
            ]
        },
        {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
        }
    ]
},
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
  {
    path: 'game-end-modal',
    loadChildren: () => import('./pages/game-end-modal/game-end-modal.module').then(m => m.ModalPageModule)
  }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
