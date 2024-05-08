import { Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { ChooseGameDialogComponent } from './choose-game-dialog/choose-game-dialog.component';
import { ExitComponent } from './exit/exit.component';
import { FormCComponent } from './form-c/form-c.component';
import { GameComponent } from './game/game.component';
import { MatchingGameComponent } from './matching-game-module/matching-game/matching-game.component';
import { MixedGameResultComponent } from './mixed-game-mudule/mixed-game-result/mixed-game-result.component';
import { MixedGameComponent } from './mixed-game-mudule/mixed-game/mixed-game.component';
import { PlayGameComponent } from './play-game/play-game.component';
import { WordSorterResultComponent } from './word-sorter-module/word-sorter-result/word-sorter-result.component';
import { WordSorterComponent } from './word-sorter-module/word-sorter/word-sorter.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component'
import { HelpPageComponent } from './help-page/help-page/help-page.component'

export const routes: Routes = [
  { path: 'category/:id', component: FormCComponent },
  { path: 'newcategory', component: FormCComponent },
  { path: 'admin', component: PlayGameComponent },
  { path: 'game/:category', component: GameComponent },
  { path: 'dialog', component: ChooseGameDialogComponent },
  { path: 'listCategory', component: CategoryListComponent },
  { path: 'matching-game/:id', component: MatchingGameComponent },
  { path: 'exit', component: ExitComponent },
  { path: 'mixed-game/:id', component: MixedGameComponent },
  { path: 'mixed-game-results/:id', component: MixedGameResultComponent },
  { path: 'word-sorter/:id', component: WordSorterComponent },
  { path: 'word-sorter-result', component: WordSorterResultComponent },
  {path: '', component: DashboardComponent },
  { path: 'help-page', component: HelpPageComponent },
  
];
