import React, { useState } from "react";
import { UserProfile, Recipe } from "../types";
import { BookOpen, Clock, Heart, Search, Filter, Lock, Star, ChevronDown, CheckSquare, Sparkles, ChefHat } from "lucide-react";

interface RecipesScreenProps {
  user: UserProfile;
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleFavorite: (recipeId: string) => void;
  source?: string;
}

const RECIPE_IMAGES: Record<string, string> = {
  // Original Initial Recipes
  "garlic-butter-chicken": "https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "lemon-herb-broccoli-pasta": "https://images.unsplash.com/photo-1607118750694-1469a22ef45d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "fragrant-garlic-fried-rice": "https://images.unsplash.com/photo-1612755637313-9517f17d84b5?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "aromatic-coconut-curry": "https://images.unsplash.com/photo-1683533738338-19b9a22c6405?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "gourmet-pan-seared-salmon": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "molecular-chocolate-lava": "https://images.unsplash.com/photo-1673551490812-eaee2e9bf0ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "gourmet-mushroom-risotto": "https://images.unsplash.com/photo-1609770424775-39ec362f2d94?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "fluffy-morning-souffle-pancakes": "https://images.unsplash.com/photo-1660470620509-de1c80598784?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zmx1ZmZ5JTIwbW9ybmluZyUyMHNvdWZmbGUlMjBwYW5jYWtlc3xlbnwwfHwwfHx8MA%3D%3D",
  "mediterranean-shakshuka": "https://images.unsplash.com/photo-1618220623386-91d8b0b9abbb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaXRlcnJhbmVhbiUyMHNoYWtzaHVrYXxlbnwwfHwwfHx8MA%3D%3D",

  // Expansion Pack Recipes
  "garlic-butter-wings": "https://images.unsplash.com/photo-1712286928542-17af515d3dcd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FybGljJTIwYnV0dGVyJTIwd2luZ3N8ZW58MHx8MHx8fDA%3D",
  "bacon-eggs": "https://images.unsplash.com/photo-1608475861994-cf7af0f0c1be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFjb24lMjBlZ2dzfGVufDB8fDB8fHww",
  "crispy-pork-belly": "https://images.unsplash.com/photo-1625477811233-044633d10dd1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "classic-beef-steak": "https://images.unsplash.com/photo-1706650616334-97875fae8521?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xhc3NpYyUyMGJlZWYlMjBzdGVha3xlbnwwfHwwfHx8MA%3D%3D",
  "sesame-chicken-thighs": "https://images.unsplash.com/photo-1687966699414-095ca9c35593?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VzYW1lJTIwY2hpY2tlbiUyMHRoaWdoc3xlbnwwfHwwfHx8MA%3D%3D",
  "classic-pasta-bolognese": "https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFzdGElMjBib2xvZ25lc2V8ZW58MHx8MHx8fDA%3D",
  "buttered-garlic-shrimp": "https://images.unsplash.com/photo-1659951226926-a75791782250?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnV0dGVyZWQlMjBnYXJsaWMlMjBzaHJpbXB8ZW58MHx8MHx8fDA%3D",
  "lemon-butter-salmon": "https://images.unsplash.com/photo-1676300185165-3f543c1fcb72?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGVtb24lMjBidXR0ZXIlMjBzYWxtb258ZW58MHx8MHx8fDA%3D",
  "tomato-basil-pasta": "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG9tYXRvJTIwYmFzaWwlMjBwYXN0YXxlbnwwfHwwfHx8MA%3D%3D",
  "creamy-spinach-mushroom-pasta": "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JlYW15JTIwc3BpbmFjaCUyMG11c2hyb29tJTIwcGFzdGF8ZW58MHx8MHx8fDA%3D",
  "loaded-sweet-potato": "https://www.eatingwell.com/thmb/s2XQ2tEVERF7ZlKM9xVb6uLrrwY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/loaded-sweet-potatoes-279219-1x1-4dd2521c473c411bb9ac74e8cb312a4a.jpg",
  "spicy-garlic-noodles": "https://images.unsplash.com/photo-1553621043-f607bfbf6640?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpY3klMjBnYXJsaWMlMjBub29kbGV8ZW58MHx8MHx8fDA%3D",
  "avocado-toast-egg": "https://images.unsplash.com/photo-1687276287139-88f7333c8ca4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZvY2FkbyUyMHRvYXN0JTIwZWdnfGVufDB8fDB8fHww",
  "honey-mustard-chicken": "https://www.lavenderandmacarons.com/wp-content/uploads/2019/03/creamy-honey-mustard-chicken-recipe-1.jpg ",
  "zucchini-carrot-salad": "https://images.unsplash.com/photo-1622324877443-00ee9732c69f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8enVjY2hpbmklMjBjYXJyb3QlMjBzYWxhZHxlbnwwfHwwfHx8MA%3D%3D",
  "cheese-onion-quesadilla": "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZXNlJTIwb25pb24lMjBxdWVzYWRpbGxhfGVufDB8fDB8fHww",
  "parmesan-asparagus": "https://plus.unsplash.com/premium_photo-1700673590016-8ea90754d9bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFybWVzYW4lMjBhc3BhcmFndXN8ZW58MHx8MHx8fDA%3D",
  "vanilla-rice-pudding": "https://www.thespruceeats.com/thmb/ivHiw4DhV_VRXr92NdRxGLaPngY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/15-minute-vanilla-rice-pudding-recipe-256121-hero-01-9d44bc9ed06c45358d6d3a32f27391a4.jpg",
  "coconut-curry-shrimp": "https://images.unsplash.com/photo-1594397107804-22dfcdef5a06?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29jb251dCUyMGN1cnJ5JTIwc2hyaW1wfGVufDB8fDB8fHww",
  "egg-fried-rice-easy": "https://images.unsplash.com/photo-1609570324378-ec0c4c9b6ba8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWdnJTIwZnJpZWQlMjByaWNlfGVufDB8fDB8fHww",
  "sausage-roasted-potato": "https://images.unsplash.com/photo-1610631087218-f784839e48f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2F1c2FnZSUyMHJvYXN0ZWQlMjBwb3RhdG98ZW58MHx8MHx8fDA%3D",
  "creamy-broccoli-soup": "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JlYW15JTIwYnJvY2NvbGklMjBzb3VwfGVufDB8fDB8fHww",
  "carrot-ginger-soup": "https://images.unsplash.com/photo-1613844237701-8f3664fc2eff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fycm90JTIwZ2luZ2VyJTIwc291cHxlbnwwfHwwfHx8MA%3D%3D",
  "chocolate-chip-pancakes": "https://images.unsplash.com/photo-1669277038743-066083326c32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwY2hpcCUyMHBhbmNha2VzfGVufDB8fDB8fHww",
  "tuna-melt-toast": "https://hips.hearstapps.com/hmg-prod/images/tuna-melt-secondary-web-049-del099925-68cc559e13277.jpg?crop=1xw:0.9996324880558618xh;center,top&resize=980:*",
  "cucumber-avocado-salad": "https://images.unsplash.com/photo-1564929360162-73cd686db4a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3VjdW1iZXIlMjBhdm9jYWRvJTIwc2FsYWR8ZW58MHx8MHx8fDA%3D",
  "ginger-garlic-beef": "https://images.unsplash.com/photo-1715963301679-993721387552?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2luZ2VyJTIwZ2FybGljJTIwYmVlZnxlbnwwfHwwfHx8MA%3D%3D",
  "banana-maple-pancakes": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hJTIwbWFwbGUlMjBwYW5jYWtlc3xlbnwwfHwwfHx8MA%3D%3D",
  "golden-buttered-rice": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGVuJTIwYnV0dGVyZWQlMjByaWNlfGVufDB8fDB8fHww",
  "garlic-butter-mushrooms": "https://images.unsplash.com/photo-1652088063505-d6d4d390b295?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGdhcmxpYyUyMGJ1dHRlciUyMG11c2hyb29tc3xlbnwwfHwwfHx8MA%3D%3D",
  "greek-yogurt-apple-honey": "https://images.unsplash.com/photo-1619683984330-b4604a0554f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JlZWslMjB5b2d1cnQlMjBhcHBsZSUyMGhvbmV5fGVufDB8fDB8fHww",
  "pork-chops-thyme": "https://images.unsplash.com/photo-1652209898504-ea7f96b44580?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9yayUyMGNob3BzJTIwdGh5bWV8ZW58MHx8MHx8fDA%3D",
  "honey-apple-snack": "https://whiskingmama.com/wp-content/uploads/2015/11/2-1536x1103.jpg.webp",
  "parmesan-zucchini-boats": "https://www.thewholesomedish.com/wp-content/uploads/2015/07/Chicken-Parmesan-Zucchini-Boats-3.jpg",
  "zucchini-paprika-crisps": "https://plus.unsplash.com/premium_photo-1690056322059-133410fbadc0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8enVjY2hpbmklMjBjcmlzcHxlbnwwfHwwfHx8MA%3D%3D",
  "sweet-chili-chicken-wings": "https://images.unsplash.com/photo-1650939986300-ce9609921fa7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3dlZXQlMjBjaGlsaSUyMGNoaWNrZW4lMjB3aW5nc3xlbnwwfHwwfHx8MA%3D%3D",
  "tortilla-mozzarella-pizza": "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG9ydGlsbGElMjBtb3p6YXJlbGxhJTIwcGl6emF8ZW58MHx8MHx8fDA%3D",
  "egg-drop-soup": "https://images.unsplash.com/photo-1652088079703-38f4a8d6b981?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWdnJTIwZHJvcCUyMHNvdXB8ZW58MHx8MHx8fDA%3D",
  "rosemary-roasted-potatoes": "https://images.unsplash.com/photo-1633959639799-6d3f66e05710?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9zZW1hcnklMjByb2FzdGVkJTIwcG90YXRvZXN8ZW58MHx8MHx8fDA%3D",
  "coconut-quinoa-pudding": "https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?auto=format&fit=crop&w=600&q=80",
  "garlic-mozzarella-bread": "data:image/jpeg;base64,/9j/4AAQSwZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXFxoYGBgXGBogHRoeHxoaGx4YGhofHSggHR0lHxsYIjEhJSkrLi4uHR8zODMtNygtLisBCgoKDg0OGxAQGy8mICYuLTctLS8wLS0tLy0tLTAyLS0wLS01LS0tLy0vLS0tLS8tLy0tLS0tLS0vLS0tLS0tLf/AABEIARMAtwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAMEBgcCAQj/xABCEAACAQIEAwYEBQMCBQIHAQABAhEAAwQSITEFQVEGEyJhcYEqiyaGxByPB0fAUQuFSchUzQ2LxFpJEU3OCorLiJP/EABoBAAMBAQEBAAAAAAAAAAAAAAIDBAEFAAb/xAAtEQACAgEDAgUEAgMBAQAAAAABAgARAxIhMUFRBBMicfBhgZGhMtGxwfEGFP/aAAwRIBUTE0eWe7eHBILFmDRmnWTofFsPapp7d3RJ/pjH9vj+/h+1cYFYRZ8/saiYpAFA9K5Iy2d50/JA4hP/BeOf84Yxt8Y3+W1MP+IjgwcK2nxQ4+mn3obnVUkkATOtMcNwf9Rd8PwsdyCJAiaIZdIs8T3kXsIYX8RLhIAwjEnf8wbeWm9OYnt9eUE/0gmRE3eX/ALd6m4/s4llkyWpBJk5jIEwIk/WuLPYUG4Wa47IdQCdug6f+KEeKBNVNPhwFBJG8F3fxEv6gYUeX5vznw/auV/ES/JjCpBGk3WkHz8Prt5a0b492MQrmsghwoECIMDmORPXzqgWk8UERG9UJk1C4k4xLMfxDxIgf09vb/CY2/X4fp9am2+0V/EWQLlm2QSNmbkfLUex61Ssk61c+C2/yFHnQZshC7Q8eFWO8kW+P4wQgFkBf+1joAIXVvrTn/GcaZ/MtjXSLeo8tWOlM3dHn5/IU+439v1pHnv3j/ITtAt/tTjpb80CTGltfDH+mZ+s15/x3HM5nEkKQAQETqNRpIJ61FVdTz15+tJjD+32ANP8xu8T5S9pZcJ3rsC966fCB8ZGntHz3qo8QLh2HeXPCzBfG2gzHQa1cOFXNQfaI6VUeIj81/8Ae33NKxsxJsxrotbCMYZBqOW8cvlUzEnwH0H3FRbe5p/FvofT9RTDzBGwg+8f0FG+At+Uf9x+1Vu5d/WpFrGlbJG0kn9KI4y4oRT5hjGowzxHj6LFsEsdiZ0oZjceYnSYiq2xlxg+dTMbigBFUJhVeBOZmz5H6/acXuJmlUXCYI3iWMhB8yegr2mRYAmiWmi0PQ/rULGNpHp+tSJ/LHoagY9t46gD5Vx13n0Jknspw5MZfh0LIgIMloMmJAEa+pOlaJheCqlvLbGSI28j+tR+yXBUw1pRHiI8R8+ftR1Hy5oGaJgDnzA1oyA3P2k2RyNhB9+6vdkNJI+lN9mMd3mZSwIDGNI05eo5Tzg0TsG2zlDpcABYdZG46jlUbGXMj5Ej06H+EfOg0lDrYwNYf0ie8Su5QwIIZtFMEjykgGB58qyjtBw+7buNcuKozsZybBiCQOuoBM89a1+4/eWmYKSRpBHnqRVP7T4U4jDMLepzA6cmGmU9DBPzotYTIDex/xEBmFSpn1nWe8Su5QwIIZtFMEjykgGB58qyjtBw+7buNcuKozsZybBiCQOuoBM89a1+4/eWmYKSRpBHnqRVP7T4U4jDMLepzA6cmGmU9DBPzotYTIDex/xEBmFSpn",
  "simple-mushroom-risotto-lite": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
  "beef-broccoli-stirfry": "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80",
  "lemon-pepper-asparagus-chicken": "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=600&q=80",
  "honey-lime-salmon": "https://images.unsplash.com/photo-1560684352-8497838a2229?auto=format&fit=crop&w=600&q=80",
  "creamy-heavy-cream-pasta": "https://images.unsplash.com/photo-1555949258-eb67b1ef0bc6?auto=format&fit=crop&w=600&q=80",
  "chocolate-cocoa-cake": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
  "pork-belly-skewers": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80",
  "bacon-spinach-frittata": "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80",
  "sausage-zucchini-skillet": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
  "crispy-fried-chicken": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80",

  // New Indian Dishes
  "butter-chicken-essentia": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
  "aromatic-veg-biryani": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80",
  "palak-cheese-curry": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
  "golden-lentil-tadka": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
  "spiced-aloo-gobi": "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80",
  "tangy-chana-masala": "https://images.unsplash.com/photo-1585938338392-50a59970d2ee?auto=format&fit=crop&w=600&q=80",
  "chicken-biryani": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "mutton-biryani": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
  "mutton-paya-soup": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
  "fried-mozzarella-sticks": "https://images.unsplash.com/photo-1531749668029-2db88e4b76ce?auto=format&fit=crop&w=600&q=80",
  "paneer-butter-masala": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
  "lemon-garlic-broccoli-pasta": "https://images.unsplash.com/photo-1621996346565-e3bb69182a59?auto=format&fit=crop&w=600&q=80"
};

// Smart fallback helper function for recipe images to guarantee high accuracy
const getRecipeImage = (recipeId: string, title: string): string => {
  if (RECIPE_IMAGES[recipeId]) {
    return RECIPE_IMAGES[recipeId];
  }
  const cleanTitle = title.toLowerCase();
  if (cleanTitle.includes("chicken") || cleanTitle.includes("wings")) {
    return "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80";
  }
  if (cleanTitle.includes("pasta") || cleanTitle.includes("noodles") || cleanTitle.includes("bolognese")) {
    return "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80";
  }
  if (cleanTitle.includes("salmon") || cleanTitle.includes("fish")) {
    return "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80";
  }
  if (cleanTitle.includes("shrimp") || cleanTitle.includes("prawn")) {
    return "https://images.unsplash.com/photo-1559737605-de6a035805bb?auto=format&fit=crop&w=600&q=80";
  }
  if (cleanTitle.includes("pork") || cleanTitle.includes("bacon")) {
    return "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80";
  }
  if (cleanTitle.includes("steak") || cleanTitle.includes("beef")) {
    return "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=600&q=80";
  }
  if (cleanTitle.includes("rice") || cleanTitle.includes("biryani")) {
    return "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80";
  }
  if (cleanTitle.includes("soup") || cleanTitle.includes("dal") || cleanTitle.includes("tadka")) {
    return "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80";
  }
  if (cleanTitle.includes("pancake") || cleanTitle.includes("dessert") || cleanTitle.includes("cake") || cleanTitle.includes("pudding")) {
    return "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80";
  }
  if (cleanTitle.includes("salad") || cleanTitle.includes("veggie") || cleanTitle.includes("carrot") || cleanTitle.includes("zucchini")) {
    return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80";
  }
  return "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=600&q=80";
};

export default function RecipesScreen({ user, recipes, onSelectRecipe, onToggleFavorite, source }: RecipesScreenProps) {
  const [hoveredRecipeId, setHoveredRecipeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [diffFilter, setDiffFilter] = useState<string>("All");
  const [mealFilter, setMealFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"match" | "time" | "level">("match");
  const [showFilters, setShowFilters] = useState(false);

  // Helper for unique realistic rating and reviews based on title and id
  const getRecipeStats = (recipeId: string, title: string) => {
    let hash = 0;
    const combined = recipeId + title;
    for (let i = 0; i < combined.length; i++) {
      hash = combined.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    const ratingVal = 4.4 + (hash % 6) * 0.1; // 4.4, 4.5, 4.6, 4.7, 4.8, 4.9
    const rating = ratingVal.toFixed(1);
    const reviews = 12 + (hash % 168); // ranges from 12 to 179
    return { rating, reviews, ratingNum: ratingVal };
  };

  // Helper dictionary matching level requirements
  const getMinLevelForDifficulty = (diff: string): number => {
    switch (diff.toLowerCase()) {
      case "apprentice":
        return 1;
      case "home chef":
        return 6;
      case "professional chef":
      case "professional":
        return 16;
      case "master chef":
      case "master":
        return 26;
      default:
        return 1;
    }
  };

  // Helper calculating ingredient available matches
  const calculateMatchDetails = (recipe: Recipe) => {
    const pantryItems = user.pantry.map(p => p.name.toLowerCase().trim());
    let matchCount = 0;
    const missing: string[] = [];

    recipe.ingredients.forEach(ing => {
      // Staples are assumed available initially
      if (ing.isStaple) {
        matchCount++;
        return;
      }

      const ingName = ing.name.toLowerCase().trim();
      const hasItem = pantryItems.some(
        p => p.includes(ingName) || ingName.includes(p)
      );

      if (hasItem) {
        matchCount++;
      } else {
        missing.push(ing.name);
      }
    });

    const total = recipe.ingredients.length;
    const pct = total > 0 ? Math.round((matchCount / total) * 100) : 100;

    return {
      percentage: pct,
      missingIngredients: missing
    };
  };

  // Filter and sort recipes
  const processedRecipes = recipes.filter(recipe => {
    // 1. Search Query
    const searchLow = searchQuery.toLowerCase().trim();
    const matchesSearch = !searchLow || 
      recipe.title.toLowerCase().includes(searchLow) ||
      recipe.description.toLowerCase().includes(searchLow) ||
      (recipe.cuisine && recipe.cuisine.toLowerCase().includes(searchLow)) ||
      recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchLow));

    // 2. Difficulty Level
    const matchesDiff = diffFilter === "All" || recipe.difficulty.toLowerCase() === diffFilter.toLowerCase();

    // 3. Meal Type
    const matchesMeal = mealFilter === "All" || (recipe.mealType && recipe.mealType.toLowerCase() === mealFilter.toLowerCase());

    return matchesSearch && matchesDiff && matchesMeal;
  }).map(recipe => {
    const matching = calculateMatchDetails(recipe);
    return {
      ...recipe,
      matchPercentage: matching.percentage,
      missing: matching.missingIngredients
    };
  }).filter(recipe => {
    // If it is the favorites drawer, don't hide low match percentage recipes.
    // Otherwise on the principal Culinary Discovery Shelf tab, only show if match is >= 70%.
    if (source === "favorites_vault") {
      return true;
    }
    return recipe.matchPercentage >= 70;
  });

  // Sort them
  const sortedRecipes = [...processedRecipes].sort((a, b) => {
    if (sortBy === "match") {
      return b.matchPercentage - a.matchPercentage;
    } else if (sortBy === "time") {
      const aTime = a.prepTime + a.cookTime;
      const bTime = b.prepTime + b.cookTime;
      return aTime - bTime;
    } else if (sortBy === "level") {
      return a.difficultyNumber - b.difficultyNumber;
    }
    return 0;
  });

  // Check locks
  const isRecipeLocked = (diff: string): boolean => {
    const req = getMinLevelForDifficulty(diff);
    return user.level < req;
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      
      {/* HUD DISCOVERY SEARCH ROW */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-2xl font-serif font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#A0855B]" />
            <span>Culinary Discovery Shelf</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Analyze available ingredients against matches. Unlocks more complex recipes as you earn XP.
          </p>
        </div>

        {source && (
          <div className="text-[10px] p-2 bg-[#F1EDE4] border border-[#E5E1D8] text-slate-650 rounded-xl uppercase font-mono font-black w-fit">
            {source.includes("fallback") ? "⚙️ Offline Classic Book" : "⭐ Smart Gemini AI Generated"}
          </div>
        )}
      </div>

      {/* FILTER BUTTONS & FORM CONTROLS */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 md:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search dishes or specific items (e.g. Garlic, Pasta, Salmon)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 bg-[#FAF9F6] transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="text-xs px-3 py-2 border border-slate-250 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white font-semibold text-slate-700"
            >
              <option value="match">Match Percentage</option>
              <option value="time">Fastest Cook Time</option>
              <option value="level">Tiers & Complexity</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                showFilters 
                  ? "bg-slate-900 border-transparent text-white" 
                  : "bg-white border-slate-250 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filter Shelf</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100 animate-slide-in">
            {/* Difficulty selector tabs */}
            <div>
              <span className="text-[9px] font-mono font-black text-slate-400 tracking-wider uppercase block mb-1.5">Chef Tiers</span>
              <div className="flex flex-wrap gap-1.5">
                {["All", "Apprentice", "Home Chef", "Professional Chef", "Master Chef"].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDiffFilter(diff)}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                      diffFilter === diff
                        ? "bg-[#6B705C] border-transparent text-white"
                        : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Meal Type selector */}
            <div>
              <span className="text-[9px] font-mono font-black text-slate-400 tracking-wider uppercase block mb-1.5">Meal Schedule</span>
              <div className="flex flex-wrap gap-1.5">
                {["All", "Breakfast", "Lunch", "Dinner", "Snack"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMealFilter(m)}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                      mealFilter === m
                        ? "bg-[#6B705C] border-transparent text-white"
                        : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SEARCH LISTINGS RESULTS */}
      {sortedRecipes.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-3 shadow-sm">
          <BookOpen className="w-10 h-10 text-slate-300 animate-bounce" />
          <p className="font-semibold max-w-sm">No recipes match your filter selections or queries.</p>
          <button
            onClick={() => { setSearchQuery(""); setDiffFilter("All"); setMealFilter("All"); }}
            className="px-4 py-2 border border-slate-200 bg-slate-50 hover:bg-slate-100 font-bold rounded-xl text-[10px] uppercase tracking-wide text-slate-700"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRecipes.map((recipe) => {
            const hasHeart = user.favorites.includes(recipe.id);
            const isLocked = isRecipeLocked(recipe.difficulty);
            const reqLvl = getMinLevelForDifficulty(recipe.difficulty);

            const isAnyHovered = hoveredRecipeId !== null;
            const isThisHovered = hoveredRecipeId === recipe.id;

            // Difficulty Color Card
            const getDiffColors = (diff: string) => {
              switch (diff.toLowerCase()) {
                case "apprentice":
                  return "bg-emerald-50 text-emerald-700 border-emerald-100";
                case "home chef":
                  return "bg-amber-50 text-amber-700 border-amber-100";
                case "professional":
                case "professional chef":
                  return "bg-purple-50 text-purple-700 border-purple-100";
                case "master chef":
                case "master":
                  return "bg-rose-50 text-rose-700 border-rose-100";
                default:
                  return "bg-slate-50 text-slate-700 border-slate-150";
              }
            };

            return (
              <div
                key={recipe.id}
                id={`recipe-${recipe.id}`}
                onMouseEnter={() => !isLocked && setHoveredRecipeId(recipe.id)}
                onMouseLeave={() => setHoveredRecipeId(null)}
                onClick={() => {
                  if (!isLocked) {
                    if (hoveredRecipeId === recipe.id) {
                      setHoveredRecipeId(null);
                    } else {
                      setHoveredRecipeId(recipe.id);
                    }
                  }
                }}
                className={`relative group bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isLocked 
                    ? "border-slate-100 opacity-75 select-none" 
                    : isThisHovered 
                    ? "border-[#A0855B] shadow-xl translate-y-[-6px] ring-4 ring-[#A0855B]/10 bg-slate-50/10"
                    : "border-slate-200 hover:border-[#A0855B] hover:shadow-md hover:translate-y-[-2px]"
                }`}
              >
                {/* Visual Cover Header Overlay if molecular master recipe or has special tag */}
                {recipe.isSpecial && (
                  <div className="absolute top-0 right-0 left-0 bg-amber-400 text-amber-950 font-sans uppercase text-[8px] font-black tracking-widest py-1 text-center border-b border-amber-500 flex items-center justify-center gap-1 z-20">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>Special Quest Dish</span>
                  </div>
                )}

                {/* 1. TOP COVER DECOR IMAGE BANNER WITH OVERLAYS */}
                <div className="relative h-44 overflow-hidden bg-slate-100 border-b border-slate-150">
                  <img 
                    src={getRecipeImage(recipe.id, recipe.title)}
                    alt={recipe.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=600&q=80";
                    }}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out transform scale-100 group-hover:scale-105 ${
                      isLocked ? "grayscale opacity-30 contrast-125" : ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white z-10">
                    <span className="text-[9px] font-mono font-black uppercase text-amber-300 bg-black/50 px-2.5 py-0.5 rounded tracking-widest leading-none">
                      {recipe.mealType || "Main"} • {recipe.cuisine || "Fusion"}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 pb-4 relative">
                  {/* Lock Indicator overlay on top if locks are applied */}
                  {isLocked && (
                    <div className="absolute inset-x-0 bottom-2 top-0 bg-white/95 flex flex-col items-center justify-center text-center p-4 z-10 transition-all">
                      <div className="p-3 bg-red-50 text-red-600 rounded-full border border-red-150 mb-2">
                        <Lock className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 tracking-tight block">Rank Lock: {recipe.difficulty}</span>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5 max-w-xs">Unlocks at culinary Level {reqLvl}. Gain XP by cooking Apprentice meals!</p>
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-3.5 mt-2">
                    <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 border rounded ${getDiffColors(recipe.difficulty)}`}>
                      {recipe.difficulty}
                    </span>

                    {/* Bookmark Heart */}
                    <button
                      onClick={(e) => { e.stopPropagation(); onToggleFavorite(recipe.id); }}
                      disabled={isLocked}
                      className={`p-2 rounded-full border transition-colors cursor-pointer ${
                        hasHeart 
                          ? "bg-rose-50 border-rose-100 text-rose-500 fill-rose-500" 
                          : "bg-[#FAF9F6] border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50/20"
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Rating display */}
                  {(() => {
                    const stats = getRecipeStats(recipe.id, recipe.title);
                    return (
                      <div className="flex items-center gap-0.5 text-[10px] text-amber-500 font-bold mb-1">
                        {[...Array(5)].map((_, idx) => {
                          const starVal = idx + 1;
                          let opacityClass = "fill-current";
                          if (stats.ratingNum < starVal - 0.2) {
                            opacityClass = "fill-current opacity-30 text-amber-300";
                          } else if (stats.ratingNum < starVal + 0.3 && stats.ratingNum >= starVal - 0.2) {
                            opacityClass = "fill-current opacity-60";
                          }
                          return <Star key={idx} className={`w-3 h-3 ${opacityClass}`} />;
                        })}
                        <span className="text-slate-400 font-mono ml-1 font-semibold">{stats.rating} ({stats.reviews} reviews)</span>
                      </div>
                    );
                  })()}

                  <h3 className="text-base font-serif font-black text-slate-900 group-hover:text-[#A0855B] tracking-tight leading-snug transition-colors">
                    {recipe.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                    {recipe.description}
                  </p>
                </div>

                {/* 2. REQUISITE MEASURES & INGREDIENT LIST SECTIONS */}
                {isThisHovered && (
                  <div className="px-6 py-4 bg-amber-50/30 border-t border-b border-amber-100/40 transition-all duration-300 space-y-2.5 animate-slide-in">
                    <span className="text-[9px] font-mono font-black text-[#A0855B] uppercase block tracking-widest">
                      📋 Raw Pantry Measures
                    </span>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-700">
                      {recipe.ingredients.map((ing, ingI) => (
                        <div key={ingI} className="text-[11px] flex items-center gap-1.5 py-0.5 truncate border-b border-dashed border-amber-200/10">
                          <span className="text-[#A0855B] text-sm leading-none">•</span>
                          <span className="truncate">{ing.name} <em className="text-slate-400 font-mono text-[9px] not-italic">({ing.amount})</em></span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Match Metrics Box (Pantry alignment) */}
                <div className="px-6 py-3 border-t border-slate-50 bg-[#FAF9F6]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-600">Pantry Alignment</span>
                    <span className={`font-mono font-bold ${
                      recipe.matchPercentage >= 80 
                        ? "text-emerald-600" 
                        : recipe.matchPercentage >= 50 
                        ? "text-amber-600" 
                        : "text-slate-500"
                    }`}>
                      {recipe.matchPercentage}% match
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-slate-200/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${
                        recipe.matchPercentage >= 80 
                           ? "bg-emerald-500" 
                          : recipe.matchPercentage >= 50 
                          ? "bg-amber-500" 
                          : "bg-slate-400"
                      }`}
                      style={{ width: `${recipe.matchPercentage}%` }}
                    />
                  </div>

                  {/* Highlight missing items */}
                  {recipe.missing && recipe.missing.length > 0 ? (
                    <p className="text-[10px] text-slate-400 mt-1.5 truncate">
                      Missing: <em className="text-slate-600 font-medium not-italic">{recipe.missing.slice(0, 2).join(", ")}</em> 
                      {recipe.missing.length > 2 && " and " + (recipe.missing.length - 2) + " more"}
                    </p>
                  ) : (
                    <p className="text-[10px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1 font-mono uppercase font-black tracking-widest border-b border-dashed border-emerald-300 w-fit">
                      <Sparkles className="w-3 h-3 text-emerald-500" />
                      <span>Perfect Cabinet Match!</span>
                    </p>
                  )}
                </div>

                {/* Card Footer details */}
                <div className="px-6 py-4 border-t border-slate-50 bg-white space-y-3">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono font-bold uppercase">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{recipe.prepTime + recipe.cookTime} min</span>
                    <span>{recipe.cuisine || "Fusion"}</span>
                    <span>{recipe.servings} pp servings</span>
                  </div>

                  <button
                    disabled={isLocked}
                    onClick={(e) => { e.stopPropagation(); onSelectRecipe(recipe); }}
                    className={`w-full py-3 rounded-2xl text-xs font-bold leading-none tracking-widest uppercase flex items-center justify-center gap-1.5 border border-transparent shadow-sm transition-all focus:outline-none pointer-cursor ${
                      isLocked 
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none" 
                        : "bg-slate-900 text-white hover:bg-[#A0855B] hover:shadow"
                    }`}
                  >
                    <ChefHat className="w-4 h-4" />
                    <span>Enter Kitchen Co-Pilot</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
