import en from "./en";
import de from "./de";
import ru from "./ru";
import { LocaleConfig } from "react-native-calendars";

LocaleConfig.locales.de = {
  monthNames: [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mär.',
    'Apr.',
    'Mai',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sept.',
    'Okt.',
    'Nov.',
    'Dez.',
  ],
  dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  dayNamesShort: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
};

LocaleConfig.locales['ru'] = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ],
  monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль.', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'],
  dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ],
  dayNamesShort: ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'],
  today: "Сегодня"
};

LocaleConfig.locales.en = LocaleConfig.locales[''];

export default {
  en,
  de,
  ru
};