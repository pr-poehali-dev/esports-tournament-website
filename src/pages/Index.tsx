import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Tournament {
  id: number;
  name: string;
  game: string;
  prize: string;
  date: string;
  status: 'live' | 'upcoming' | 'finished';
  teams: number;
}

interface Player {
  rank: number;
  name: string;
  team: string;
  rating: number;
  wins: number;
  losses: number;
  change: number;
}

interface Team {
  rank: number;
  name: string;
  rating: number;
  members: number;
  wins: number;
  losses: number;
}

const tournaments: Tournament[] = [
  { id: 1, name: 'Кубок Чемпионов 2024', game: 'CS2', prize: '500 000 ₽', date: '15 ноября', status: 'live', teams: 16 },
  { id: 2, name: 'Зимний Турнир', game: 'Dota 2', prize: '300 000 ₽', date: '20 ноября', status: 'upcoming', teams: 12 },
  { id: 3, name: 'Осенний Кубок', game: 'Valorant', prize: '200 000 ₽', date: '25 ноября', status: 'upcoming', teams: 8 },
  { id: 4, name: 'Летний Чемпионат', game: 'CS2', prize: '450 000 ₽', date: '10 ноября', status: 'finished', teams: 16 },
];

const topPlayers: Player[] = [
  { rank: 1, name: 'ProPlayer_RU', team: 'Team Alpha', rating: 2850, wins: 145, losses: 23, change: 12 },
  { rank: 2, name: 'CyberNinja', team: 'Cyber Legends', rating: 2780, wins: 132, losses: 28, change: -5 },
  { rank: 3, name: 'FrostByte', team: 'Team Alpha', rating: 2745, wins: 128, losses: 31, change: 8 },
  { rank: 4, name: 'ShadowStrike', team: 'Dark Phoenix', rating: 2690, wins: 120, losses: 35, change: 3 },
  { rank: 5, name: 'ElectricAce', team: 'Cyber Legends', rating: 2650, wins: 115, losses: 38, change: -2 },
];

const topTeams: Team[] = [
  { rank: 1, name: 'Team Alpha', rating: 2920, members: 5, wins: 89, losses: 12 },
  { rank: 2, name: 'Cyber Legends', rating: 2865, members: 5, wins: 85, losses: 16 },
  { rank: 3, name: 'Dark Phoenix', rating: 2790, members: 5, wins: 78, losses: 23 },
  { rank: 4, name: 'Storm Riders', rating: 2720, members: 5, wins: 72, losses: 29 },
  { rank: 5, name: 'Digital Warriors', rating: 2680, members: 5, wins: 68, losses: 33 },
];

const Index = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const getStatusColor = (status: Tournament['status']) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 text-white animate-pulse-glow';
      case 'upcoming':
        return 'bg-primary text-primary-foreground';
      case 'finished':
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: Tournament['status']) => {
    switch (status) {
      case 'live':
        return 'В ЭФИРЕ';
      case 'upcoming':
        return 'Скоро';
      case 'finished':
        return 'Завершён';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/files/58423d6b-4f4b-4f1a-8b73-d7e6627dc4d5.png" alt="MLT League" className="h-12 w-12 object-contain" />
            <span className="text-2xl font-bold text-primary">MLT League</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#tournaments" className="text-sm font-medium hover:text-primary transition-colors">Турниры</a>
            <a href="#schedule" className="text-sm font-medium hover:text-primary transition-colors">Расписание</a>
            <a href="#teams" className="text-sm font-medium hover:text-primary transition-colors">Команды</a>
            <a href="#streams" className="text-sm font-medium hover:text-primary transition-colors">Трансляции</a>
            <a href="#rules" className="text-sm font-medium hover:text-primary transition-colors">Правила</a>
          </div>

          <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
            <DialogTrigger asChild>
              <Button className="glow-primary">
                <Icon name="UserPlus" className="mr-2 h-4 w-4" />
                Регистрация
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Регистрация на турнир</DialogTitle>
                <DialogDescription>
                  Заполните форму для участия в киберспортивных соревнованиях
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nickname">Никнейм</Label>
                  <Input id="nickname" placeholder="Ваш игровой ник" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team">Команда</Label>
                  <Input id="team" placeholder="Название команды" />
                </div>
                <Button className="w-full glow-primary">
                  Зарегистрироваться
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20"></div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
              КИБЕРСПОРТИВНАЯ АРЕНА
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Соревнуйтесь с лучшими игроками, участвуйте в турнирах и поднимайтесь в рейтинге
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="glow-primary text-lg px-8">
                <Icon name="Trophy" className="mr-2 h-5 w-5" />
                Смотреть турниры
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary hover:bg-primary/10">
                <Icon name="Play" className="mr-2 h-5 w-5" />
                Трансляции
              </Button>
            </div>
          </div>
        </div>
      </section>



      <section className="py-16 bg-card/50">
        <div className="container">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <Icon name="BarChart3" className="h-10 w-10 text-secondary" />
            Рейтинг
          </h2>

          <Tabs defaultValue="players" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="players" className="text-base">
                <Icon name="User" className="mr-2 h-4 w-4" />
                Игроки
              </TabsTrigger>
              <TabsTrigger value="teams" className="text-base">
                <Icon name="Users" className="mr-2 h-4 w-4" />
                Команды
              </TabsTrigger>
            </TabsList>

            <TabsContent value="players">
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Топ игроков</CardTitle>
                  <CardDescription>Лучшие игроки по рейтингу</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPlayers.map((player, index) => (
                      <div 
                        key={player.rank}
                        className="flex items-center gap-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-all hover:scale-105 animate-slide-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-xl ${
                          player.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                          player.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                          player.rank === 3 ? 'bg-orange-600/20 text-orange-600' :
                          'bg-primary/20 text-primary'
                        }`}>
                          {player.rank}
                        </div>
                        
                        <div className="flex-1">
                          <div className="font-bold text-lg">{player.name}</div>
                          <div className="text-sm text-muted-foreground">{player.team}</div>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-xl text-primary">{player.rating}</div>
                          <div className="text-sm text-muted-foreground">
                            {player.wins}W / {player.losses}L
                          </div>
                        </div>

                        <div className={`flex items-center gap-1 text-sm font-medium ${
                          player.change > 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          <Icon name={player.change > 0 ? 'TrendingUp' : 'TrendingDown'} className="h-4 w-4" />
                          {Math.abs(player.change)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="teams">
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Топ команд</CardTitle>
                  <CardDescription>Лучшие команды по рейтингу</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topTeams.map((team, index) => (
                      <div 
                        key={team.rank}
                        className="flex items-center gap-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-all hover:scale-105 animate-slide-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-xl ${
                          team.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                          team.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                          team.rank === 3 ? 'bg-orange-600/20 text-orange-600' :
                          'bg-secondary/20 text-secondary'
                        }`}>
                          {team.rank}
                        </div>
                        
                        <div className="flex-1">
                          <div className="font-bold text-lg">{team.name}</div>
                          <div className="text-sm text-muted-foreground">{team.members} участников</div>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-xl text-secondary">{team.rating}</div>
                          <div className="text-sm text-muted-foreground">
                            {team.wins}W / {team.losses}L
                          </div>
                        </div>

                        <Button variant="ghost" size="sm">
                          <Icon name="ChevronRight" className="h-5 w-5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 container">
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <Icon name="Radio" className="h-10 w-10 text-accent animate-pulse" />
          Прямые трансляции
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="group overflow-hidden hover:scale-105 transition-all duration-300 gradient-card">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="Play" className="h-16 w-16 text-white/80 group-hover:scale-110 transition-transform" />
                </div>
                <Badge className="absolute top-3 left-3 bg-red-500 text-white animate-pulse">
                  <Icon name="Circle" className="h-2 w-2 mr-1 fill-current" />
                  LIVE
                </Badge>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-sm">
                  12.5K зрителей
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Финал CS2 Чемпионата</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Icon name="User" className="h-4 w-4" />
                  ProStreamer_RU
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-card/30 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="https://cdn.poehali.dev/files/58423d6b-4f4b-4f1a-8b73-d7e6627dc4d5.png" alt="MLT League" className="h-10 w-10 object-contain" />
                <span className="text-xl font-bold text-primary">MLT League</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Платформа для киберспортивных соревнований и турниров
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Турниры</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Расписание</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Активные</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Архив</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Сообщество</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Рейтинги</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Команды</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Правила</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Связь</h3>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="hover:border-primary hover:text-primary">
                  <Icon name="MessageCircle" className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="outline" className="hover:border-primary hover:text-primary">
                  <Icon name="Mail" className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="outline" className="hover:border-primary hover:text-primary">
                  <Icon name="Globe" className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 CyberArena. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;