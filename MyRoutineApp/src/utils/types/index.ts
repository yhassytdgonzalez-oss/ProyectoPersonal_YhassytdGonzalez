export type MovementType = 'income' | 'expense';

export interface Movement {
  id: string;
  type: MovementType;
  amount: number;
  category: string;
  description?: string;
  date: string;
}

export type TabParamList = {
  Inicio: undefined;
  Movimientos: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined; 
  MovementForm: undefined;
};