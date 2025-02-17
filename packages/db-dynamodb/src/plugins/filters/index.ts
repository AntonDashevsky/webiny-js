import eqFilter from "./eq.js";
import betweenFilter from "./between.js";
import andInFilter from "./andIn.js";
import inFilter from "./in.js";
import gtFilter from "./gt.js";
import gteFilter from "./gte.js";
import ltFilter from "./lt.js";
import lteFilter from "./lte.js";
import containsFilter from "./contains.js";
import fuzzyFilter from "./fuzzy.js";
import startsWithFilter from "./startsWith.js";

export default () => [
    eqFilter,
    andInFilter,
    inFilter,
    gtFilter,
    ltFilter,
    gteFilter,
    lteFilter,
    betweenFilter,
    containsFilter,
    fuzzyFilter,
    startsWithFilter
];
