import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ScorePointService } from '../../Services/scorePoint.service'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  totalGamesPlayed: number = 0;
  totalPointsEarned: number = 0;

  constructor(private scorePointService: ScorePointService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const games = this.scorePointService.list();
    this.totalGamesPlayed = games.length;
    this.totalPointsEarned = games.reduce((acc, game) => acc + game.scorePoint, 0);
  }
}
