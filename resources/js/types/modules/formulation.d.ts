import { Ingredient } from "./inventory";
import { Category, Tag } from "../index";
export interface Formula {
    id: number;
    name: string;
    slug: string;
    description: string;
    notes: string;
    status: 'draft' | 'published' | 'archived';
    category?: Category;
    tags?: Tag[];
    phases: ListedPhase[];
    method: Method[];
    version: string;
    primary_formula: boolean;
    created_at?: string;
}

export interface BackendPhaseIngredient {
    id: number;
    name: string;
    inci_name: string;
    percentage_weight_per_weight: number;
    quantity_sufficient: boolean;
}

export interface BackendIngredientInPhase {
    id: number;
    name: string;
    inci_name: string;
    percentage_weight_per_weight: number;
    quantity_sufficient: boolean;
}

export interface Phase {
    id: number;
    name: string;
    ingredients: BackendIngredientInPhase[];
}

export interface ListedPhase {
    id: number;
    name: string;
    ingredients: BackendIngredientInPhase[];
    percentage_weight_per_weight: number;
    quantity_sufficient: boolean;
}

export interface FrontendPhaseIngredient {
    id: string;
    ingredient_id: number | null;
    name: string;
    inci_name: string;
    percentage_weight_per_weight: number | null;
    quantity_sufficient: boolean;
}

interface PhaseData {
    id: string;
    name: string;
    ingredients: FrontendPhaseIngredient[];
}

interface PhaseFormData {
  phases: PhaseData[];
  [key: string]: any;
}
export interface ComboboxIngredientOption {
    id: number; 
    name: string;
    inci_name: string;
}

interface IngredientComboboxProps {
    value: number | null,
    onValueChange: (value: number | null) => void,
    ingredients: ComboboxIngredientOption[],
    placeholder: string
    id: string
}

interface IngredientRowProps {
    ingredient: FrontendPhaseIngredient,
    phaseId: string,
    onUpdate: (updatedIngredient: FrontendPhaseIngredient) => void,
    onDelete: () => void,
    ingredientsOptions: ComboboxIngredientOption[],
    errors: any,
    mappedErrors: { [field: string]: string };
}


interface PhaseSectionProps {
    phase: PhaseData;
    onAddIngredient: (phaseId: string) => void;
    onUpdateIngredient: (phaseId: string, updatedIngredient: FrontendPhaseIngredient) => void;
    onDeleteIngredient: (phaseId: string, ingredientId: string) => void;
    onDeletePhase: (phaseIdToDelete: string) => void;
    ingredientsOptions: ComboboxIngredientOption[];
    errors: any;
    allMappedErrors: { [key: string]: { [field: string]: string } };
}

export interface Method {
    id: string;
    step: number;
    formula_id: number | null;
    instruction: string;
}

interface MethodFormData {
    methods: Method[];
    [key: string]: any;
}
interface MethodFormProps {
    tenant: string;
    formula: {
        id: number
        slug: string
    };
    method?: Method[]; 
}

interface MethodRowProps {
    method: Method;
    onUpdateMethod: (updatedMethod: Method) => void;
    onDeleteMethod: (methodId: string) => void;
    errors: { [key: string]: string };
}