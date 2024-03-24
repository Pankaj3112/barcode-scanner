import {
  LocalDiningOutlined,
  WhatshotOutlined,
  FitnessCenterOutlined,
  WavesOutlined,
  GrainOutlined,
  OpacityOutlined,
  ScienceOutlined,
  AcUnitOutlined,
} from "@mui/icons-material";

function calculateScore(productGrade, additivesNumber, ecoScore) {
  const weights = {
    nutritionQuality: 0.6,
    additives: 0.3,
    eco: 0.1,
  };

  const gradeWeight = {
    a: 100,
    b: 75,
    c: 50,
    d: 25,
    e: 0,
  };

  const nutritionScore =
    (gradeWeight[productGrade] ? gradeWeight[productGrade] : 0) *
    weights.nutritionQuality;
  const additivesScore = additivesNumber <= 6 ? (6 - additivesNumber) * 5 : 0;
  const EcoScore = (ecoScore ? ecoScore : 0) * weights.eco;

  const score = nutritionScore + additivesScore + EcoScore;
  return Math.floor(score);
}

function analyzeNutrition(nutritionData, additives) {
  const {
    carbohydrates_100g,
    carbohydrates_unit,
    fat_100g,
    fat_unit,
    fiber_100g,
    fiber_unit,
    proteins_100g,
    proteins_unit,
    salt_100g,
    salt_unit,
    sodium_100g,
    sodium_unit,
    sugars_100g,
    sugars_unit,
  } = nutritionData;

  let carbFeedback = {};
  let fatFeedback = {};
  let fiberFeedback = {};
  let proteinFeedback = {};
  let saltFeedback = {};
  let sodiumFeedback = {};
  let sugarFeedback = {};
  let additivesFeedback = {};

  // Analyze carbohydrate content
  if (carbohydrates_100g <= 15) {
    carbFeedback = { feedback: "Low carbohydrate content", color: "bg-green-600" };
  } else {
    carbFeedback = { feedback: "High carbohydrate content", color: "bg-red-600" };
  }

  // Analyze fat content
  if (fat_100g <= 3) {
    fatFeedback = { feedback: "Low fat content", color: "bg-green-600" };
  } else if (fat_100g > 3 && fat_100g <= 17.5) {
    fatFeedback = { feedback: "Moderate fat content", color: "bg-yellow-400" };
  } else {
    fatFeedback = { feedback: "High fat content", color: "bg-red-600" };
  }

  // Analyze fiber content
  if (fiber_100g >= 3) {
    fiberFeedback = { feedback: "High fiber content", color: "bg-green-600" };
  } else {
    fiberFeedback = { feedback: "Low fiber content", color: "bg-red-600" };
  }

  // Analyze protein content
  if (proteins_100g >= 10) {
    proteinFeedback = { feedback: "High protein content", color: "bg-green-600" };
  } else {
    proteinFeedback = { feedback: "Low protein content", color: "bg-red-600" };
  }

  // Analyze salt content
  if (salt_100g <= 0.3) {
    saltFeedback = { feedback: "Low salt content", color: "bg-green-600" };
  } else {
    saltFeedback = { feedback: "Too salty", color: "bg-red-600" };
  }

  // Analyze sodium content
  if (sodium_100g <= 0.3) {
    sodiumFeedback = { feedback: "Low sodium content", color: "bg-green-600" };
  } else {
    sodiumFeedback = { feedback: "High sodium content", color: "bg-red-600" };
  }

  // Analyze sugar content
  if (sugars_100g <= 5) {
    sugarFeedback = { feedback: "Good amount of sugar", color: "bg-green-600" };
  } else {
    sugarFeedback = { feedback: "Too sweet", color: "bg-red-600" };
  }

  if (additives < 1) {
    additivesFeedback = { feedback: "No addtives added", color: "bg-green-600" };
  } else {
    additivesFeedback = {
      feedback: "Additives precautions to avoid",
      color: "bg-red-600",
    };
  }

  carbFeedback = {
    name: "Carbohydrate",
    Icon: LocalDiningOutlined,
    quantity: carbohydrates_100g + carbohydrates_unit,
    ...carbFeedback,
  };

  fatFeedback = {
    name: "Fat",
    Icon: WhatshotOutlined,
    quantity: fat_100g + fat_unit,
    ...fatFeedback,
  };

  fiberFeedback = {
    name: "Fiber",
    Icon: FitnessCenterOutlined,
    quantity: fiber_100g + fiber_unit,
    ...fiberFeedback,
  };

  proteinFeedback = {
    name: "Protein",
    Icon: WavesOutlined,
    quantity: proteins_100g + proteins_unit,
    ...proteinFeedback,
  };

  saltFeedback = {
    name: "Salt",
    Icon: AcUnitOutlined,
    quantity: salt_100g + salt_unit,
    ...saltFeedback,
  };

  sodiumFeedback = {
    name: "Sodium",
    Icon: GrainOutlined,
    quantity: sodium_100g + sodium_unit,
    ...sodiumFeedback,
  };

  sugarFeedback = {
    name: "Sugar",
    Icon: OpacityOutlined,
    quantity: sugars_100g + sugars_unit,
    ...sugarFeedback,
  };

  additivesFeedback = {
    name: "Additives",
    Icon: ScienceOutlined,
    quantity: additives,
    ...additivesFeedback,
  };

  return [
    additivesFeedback,
    sugarFeedback,
    proteinFeedback,
    carbFeedback,
    fatFeedback,
    fiberFeedback,
    saltFeedback,
    sodiumFeedback,
  ];
}

export { calculateScore, analyzeNutrition };
