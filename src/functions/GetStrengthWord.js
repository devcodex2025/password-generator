export function getStrengthWord(score, language) {
    switch (score) {
      case 1:
        switch (language) {
          case "ua": return "Дуже слабкий";
          case "en": return "Very Weak";
          case "es": return "Muy Débil";
          case "fr": return "Très Faible";
          case "de": return "Sehr Schwach";
          case "it": return "Molto Debole";
          case "pt": return "Muito Fraco";
          case "ru": return "Очень Слабый";
          case "zh": return "很弱";
          case "ja": return "非常に弱い";
          case "pl": return "Bardzo słaby";
          case "vi": return "Rất yếu";
          default: return "Very Weak";
        }
      case 2:
        switch (language) {
          case "ua": return "Слабкий";
          case "en": return "Weak";
          case "es": return "Débil";
          case "fr": return "Faible";
          case "de": return "Schwach";
          case "it": return "Debole";
          case "pt": return "Fraco";
          case "ru": return "Слабый";
          case "zh": return "弱";
          case "ja": return "弱い";
          case "pl": return "Słaby";
          case "vi": return "Yếu";
          default: return "Weak";
        }
      case 3:
        switch (language) {
          case "ua": return "Середній";
          case "en": return "Moderate";
          case "es": return "Moderado";
          case "fr": return "Modéré";
          case "de": return "Mittel";
          case "it": return "Moderato";
          case "pt": return "Moderado";
          case "ru": return "Средний";
          case "zh": return "中等";
          case "ja": return "普通";
          case "pl": return "Średni";
          case "vi": return "Trung bình";
          default: return "Moderate";
        }
      case 4:
        switch (language) {
          case "ua": return "Сильний";
          case "en": return "Strong";
          case "es": return "Fuerte";
          case "fr": return "Fort";
          case "de": return "Stark";
          case "it": return "Forte";
          case "pt": return "Forte";
          case "ru": return "Сильный";
          case "zh": return "强";
          case "ja": return "強い";
          case "pl": return "Silny";
          case "vi": return "Mạnh";
          default: return "Strong";
        }
      default:
        switch (language) {
          case "ua": return "Дуже слабкий";
          case "en": return "Very Weak";
          case "es": return "Muy Débil";
          case "fr": return "Très Faible";
          case "de": return "Sehr Schwach";
          case "it": return "Molto Debole";
          case "pt": return "Muito Fraco";
          case "ru": return "Очень Слабый";
          case "zh": return "很弱";
          case "ja": return "非常に弱い";
          case "pl": return "Bardzo słaby";
          case "vi": return "Rất yếu";
          default: return "Very Weak";
        }
    }
  }
  