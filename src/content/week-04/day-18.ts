import type { DayData } from '../types';
import mathTheory from './day-18/math-theory.html?raw';
import chemistryTheory from './day-18/chemistry-theory.html?raw';

export const day18: DayData = {
  day: 18,
  week: 4,
  subjects: [
    {
      subject: 'math',
      title: 'Решение уравнений: сложные случаи',
      theory: mathTheory,
      selfCheck: [
        {
          question: 'Решите уравнение: $5(x - 2) - 3(x + 1) = 4$',
          options: ['8', '8.5', '9', '9.5'],
          correctAnswer: '8.5',
        },
        {
          question: 'Решите уравнение: $\\frac{x}{4} - \\frac{x}{3} = 1$',
          options: ['-12', '-10', '10', '12'],
          correctAnswer: '-12',
        },
        {
          question: 'При каком значении $a$ уравнение $ax = 12$ имеет корень $x = -3$?',
          options: ['4', '-4', '3', '-3'],
          correctAnswer: '-4',
        },
        {
          question: 'Сколько корней имеет уравнение $0 \\cdot x = 7$?',
          options: ['Один', 'Ни одного', 'Бесконечно много', 'Два'],
          correctAnswer: 'Ни одного',
        },
        {
          question: 'Решите уравнение: $|x| = 5$',
          options: ['5', '-5', '5 и -5', '0'],
          correctAnswer: '5 и -5',
        },
      ],
      practice: [
        {
          id: 'm18-1',
          difficulty: 'easy',
          text: 'Решите уравнение: $\\frac{x}{2} + \\frac{x}{3} = 5$',
          solution: 'Умножаем на 6: $3x + 2x = 30$. $5x = 30$. $x = 6$. Ответ: 6.',
        },
        {
          id: 'm18-2',
          difficulty: 'easy',
          text: 'Решите уравнение: $4(3x - 1) - 2(5x - 3) = 6$',
          solution: '$12x - 4 - 10x + 6 = 6$. $2x + 2 = 6$. $2x = 4$. $x = 2$. Ответ: 2.',
        },
        {
          id: 'm18-3',
          difficulty: 'medium',
          text: 'Решите уравнение: $$\\frac{x + 3}{4} - \\frac{x - 1}{2} = \\frac{1}{2}$$',
          hint: 'Приведите дроби к общему знаменателю 4, затем умножьте обе части на 4.',
          solution: 'Умножаем на 4: $4 \\cdot \\frac{x + 3}{4} - 4 \\cdot \\frac{x - 1}{2} = 4 \\cdot \\frac{1}{2}$. $(x + 3) - 2(x - 1) = 2$. $x + 3 - 2x + 2 = 2$. $-x + 5 = 2$. $-x = -3$. $x = 3$.',
        },
        {
          id: 'm18-4',
          difficulty: 'medium',
          text: 'Найдите корни уравнения: $|2x - 3| = 7$',
          hint: 'Рассмотрите два случая: когда выражение под модулем равно 7 и когда оно равно -7.',
          solution: '1) $2x - 3 = 7$, $2x = 10$, $x = 5$. 2) $2x - 3 = -7$, $2x = -4$, $x = -2$. Ответ: $x = 5$ и $x = -2$.',
        },
        {
          id: 'm18-5',
          difficulty: 'hard',
          text: 'При каком значении $a$ уравнение $\\frac{ax - 1}{2} - \\frac{x + 2}{3} = 1$ имеет корень $x = 2$?',
          hint: 'Подставьте $x = 2$ в уравнение и решите полученное уравнение относительно $a$.',
          solution: 'Подставляем $x = 2$: $\\frac{2a - 1}{2} - \\frac{2 + 2}{3} = 1$. $\\frac{2a - 1}{2} - \\frac{4}{3} = 1$. Умножаем на 6: $3(2a - 1) - 8 = 6$. $6a - 3 - 8 = 6$. $6a - 11 = 6$. $6a = 17$. $a = \\frac{17}{6} = 2\\frac{5}{6}$. Ответ: $a = \\frac{17}{6}$.',
        },
        {
          id: 'm18-6',
          difficulty: 'easy',
          text: 'Решите уравнение: $\\frac{x}{5} - \\frac{x}{10} = 3$',
          solution: 'Умножаем на 10: $2x - x = 30$. $x = 30$. Ответ: 30.',
        },
        {
          id: 'm18-7',
          difficulty: 'medium',
          text: 'Решите уравнение с модулем: $|x - 2| = 5$',
          solution: '1) $x - 2 = 5$, $x = 7$. 2) $x - 2 = -5$, $x = -3$. Ответ: $x = 7$ и $x = -3$.',
        },
        {
          id: 'm18-8',
          difficulty: 'medium',
          text: 'Решите уравнение: $\\frac{2x + 1}{3} = \\frac{x - 2}{4}$',
          hint: 'Используйте основное свойство пропорции.',
          solution: 'По свойству пропорции: $4(2x + 1) = 3(x - 2)$. $8x + 4 = 3x - 6$. $8x - 3x = -6 - 4$. $5x = -10$. $x = -2$. Ответ: $-2$.',
        },
        {
          id: 'm18-9',
          difficulty: 'hard',
          text: 'При каком $a$ уравнение $\\frac{5x + a}{3} - \\frac{x - 1}{2} = 2$ имеет корень $x = 1$?',
          solution: 'Подставляем $x = 1$: $\\frac{5 + a}{3} - \\frac{1 - 1}{2} = 2$. $\\frac{5 + a}{3} - \\frac{0}{2} = 2$. $\\frac{5 + a}{3} = 2$. $5 + a = 6$. $a = 1$. Ответ: $a = 1$.',
        },
        {
          id: 'm18-10',
          difficulty: 'hard',
          text: 'Решите уравнение: $$\\frac{x - 1}{2} - \\frac{2x - 3}{4} = \\frac{x + 1}{8}$$',
          hint: 'Умножьте обе части на 8 — наименьший общий знаменатель.',
          solution: 'Умножаем на 8: $4(x - 1) - 2(2x - 3) = x + 1$. $4x - 4 - 4x + 6 = x + 1$. $2 = x + 1$. $x = 1$. Ответ: $x = 1$.',
        },
      ],
    },
    {
      subject: 'chemistry',
      title: 'Типы химических реакций. Окислительно-восстановительные реакции',
      theory: chemistryTheory,
      selfCheck: [
        {
          question: 'Какая реакция называется реакцией соединения?',
          options: ['$A + B \\rightarrow AB$', '$AB \\rightarrow A + B$', '$AB + C \\rightarrow AC + B$', '$AB + CD \\rightarrow AD + CB$'],
          correctAnswer: '$A + B \\rightarrow AB$',
        },
        {
          question: 'Какая реакция называется реакцией разложения?',
          options: ['$A + B \\rightarrow AB$', '$AB \\rightarrow A + B$', '$AB + C \\rightarrow AC + B$', '$AB + CD \\rightarrow AD + CB$'],
          correctAnswer: '$AB \\rightarrow A + B$',
        },
        {
          question: 'Что такое окислитель?',
          options: ['Вещество, которое отдаёт электроны', 'Вещество, которое принимает электроны', 'Вещество, которое не меняет степень окисления', 'Вещество, которое выделяет тепло'],
          correctAnswer: 'Вещество, которое принимает электроны',
        },
        {
          question: 'Как изменяется степень окисления при восстановлении?',
          options: ['Повышается', 'Понижается', 'Не изменяется', 'Сначала повышается, потом понижается'],
          correctAnswer: 'Понижается',
        },
        {
          question: 'Какая реакция является окислительно-восстановительной?',
          options: ['$NaOH + HCl \\rightarrow NaCl + H_2O$', '$Fe + S \\rightarrow FeS$', '$NaCl + AgNO_3 \\rightarrow AgCl + NaNO_3$', '$CaCO_3 \\rightarrow CaO + CO_2$'],
          correctAnswer: '$Fe + S \\rightarrow FeS$',
        },
      ],
      practice: [
        {
          id: 'h18-1',
          difficulty: 'easy',
          text: 'Определите тип реакции: а) $2Mg + O_2 \\rightarrow 2MgO$; б) $2KClO_3 \\rightarrow 2KCl + 3O_2$; в) $Fe + CuCl_2 \\rightarrow FeCl_2 + Cu$',
          solution: 'а) соединение; б) разложение; в) замещение.',
        },
        {
          id: 'h18-2',
          difficulty: 'easy',
          text: 'Определите степень окисления серы в соединениях: $S$, $SO_2$, $SO_3$, $H_2S$, $H_2SO_4$',
          solution: '$S$ — 0 (простое вещество). $SO_2$: O(-2), значит S = +4. $SO_3$: S = +6. $H_2S$: H(+1), значит S = -2. $H_2SO_4$: H(+1, ×2 = +2), O(-2, ×4 = -8), значит S = +6.',
        },
        {
          id: 'h18-3',
          difficulty: 'medium',
          text: 'Закончите уравнение реакции, определите её тип: $Zn + HCl \\rightarrow$',
          solution: '$Zn + 2HCl \\rightarrow ZnCl_2 + H_2$. Тип: замещение. ОВР: $Zn^0 - 2e^- \\rightarrow Zn^{+2}$ (окисление), $2H^+ + 2e^- \\rightarrow H_2^0$ (восстановление).',
        },
        {
          id: 'h18-4',
          difficulty: 'medium',
          text: 'Определите окислитель и восстановитель в реакции: $2Al + 3Cl_2 \\rightarrow 2AlCl_3$',
          solution: '$Al^0 - 3e^- \\rightarrow Al^{+3}$ — окисление, Al — восстановитель. $Cl_2^0 + 2e^- \\rightarrow 2Cl^-$ — восстановление, $Cl_2$ — окислитель.',
        },
        {
          id: 'h18-5',
          difficulty: 'hard',
          text: 'Расставьте степени окисления всех элементов и определите, является ли реакция окислительно-восстановительной:\\n\\n$$2KMnO_4 \\xrightarrow{t} K_2MnO_4 + MnO_2 + O_2$$',
          hint: 'Сравните степени окисления марганца и кислорода в исходном веществе и продуктах реакции.',
          solution: 'Исходные: $K^{+1}Mn^{+7}O_4^{-2}$. Продукты: $K_2^{+1}Mn^{+6}O_4^{-2}$, $Mn^{+4}O_2^{-2}$, $O_2^0$. Изменения: $Mn^{+7} \\rightarrow Mn^{+6}$ (восстановление), $Mn^{+7} \\rightarrow Mn^{+4}$ (восстановление). $O^{-2} \\rightarrow O_2^0$ (окисление). Да, это ОВР!',
        },
        {
          id: 'h18-6',
          difficulty: 'easy',
          text: 'Определите тип реакции: а) $CaO + H_2O \\rightarrow Ca(OH)_2$; б) $2H_2O \\rightarrow 2H_2 + O_2$; в) $Cu + 2AgNO_3 \\rightarrow Cu(NO_3)_2 + 2Ag$',
          solution: 'а) соединение; б) разложение; в) замещение.',
        },
        {
          id: 'h18-7',
          difficulty: 'medium',
          text: 'Определите степени окисления хлора в соединениях: $Cl_2$, $HCl$, $KClO_3$, $HClO_4$',
          solution: '$Cl_2$ — 0. $HCl$: H(+1), Cl = -1. $KClO_3$: K(+1), O(-2, ×3 = -6), Cl = +5. $HClO_4$: H(+1), O(-2, ×4 = -8), Cl = +7.',
        },
        {
          id: 'h18-8',
          difficulty: 'medium',
          text: 'Закончите уравнение, определите тип и является ли реакция ОВР: $CaCO_3 + HCl \\rightarrow$',
          solution: '$CaCO_3 + 2HCl \\rightarrow CaCl_2 + CO_2 + H_2O$. Тип: обмен. Не ОВР (степени окисления не меняются).',
        },
        {
          id: 'h18-9',
          difficulty: 'hard',
          text: 'Определите окислитель и восстановитель: $2Na + Cl_2 \\rightarrow 2NaCl$',
          solution: '$Na^0 - 1e^- \\rightarrow Na^{+1}$ — окисление, Na — восстановитель. $Cl_2^0 + 2e^- \\rightarrow 2Cl^-$ — восстановление, $Cl_2$ — окислитель.',
        },
        {
          id: 'h18-10',
          difficulty: 'hard',
          text: 'Определите, является ли ОВР: $2Al + Fe_2O_3 \\rightarrow Al_2O_3 + 2Fe$. Если да — укажите окислитель и восстановитель.',
          hint: 'Сравните степени окисления алюминия и железа до и после реакции.',
          solution: 'До: $Al^0$, $Fe^{+3}_2O_3^{-2}$. После: $Al_2^{+3}O_3^{-2}$, $Fe^0$. $Al^0 - 3e^- \\rightarrow Al^{+3}$ — окисление, Al — восстановитель. $Fe^{+3} + 3e^- \\rightarrow Fe^0$ — восстановление, $Fe_2O_3$ — окислитель. Да, это ОВР.',
        },
      ],
      starTask: {
        id: 'h18-star',
        difficulty: 'hard',
        text: 'Решите задачу-головоломку:\\n\\nВ трёх пробирках находятся вещества: $Mg$, $MgO$, $Mg(OH)_2$. Как, используя только эти вещества и воду, получить $Mg(OH)_2$ двумя разными способами? Запишите уравнения реакций, определите их типы. Какая из реакций является ОВР?',
        hint: 'Вспомните: оксид магния реагирует с водой. Металлический магний тоже может реагировать с водой.',
        solution: '**Способ 1:** $MgO + H_2O \\rightarrow Mg(OH)_2$. Тип: соединение. Не ОВР. **Способ 2:** $Mg + 2H_2O \\xrightarrow{t} Mg(OH)_2 + H_2$. Тип: замещение. ОВР: $Mg^0 - 2e^- \\rightarrow Mg^{+2}$ (окисление), $2H^+ + 2e^- \\rightarrow H_2^0$ (восстановление).',
      },
    },
  ],
};
