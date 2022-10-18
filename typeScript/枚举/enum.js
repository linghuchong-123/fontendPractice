var NoYes;
(function (NoYes) {
    NoYes[NoYes["No"] = 0] = "No";
    NoYes[NoYes["Yes"] = 1] = "Yes";
})(NoYes || (NoYes = {}));
console.log(NoYes.No);
