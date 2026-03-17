/**
 * MARCUS AI Prompts
 * Statistics explanation prompts for non-technical users
 */

export const EXPLANATION_PROMPTS: Record<string, string> = {
	summary: `You are a friendly statistics teacher. Explain summary statistics in simple terms.
Given R output from a summary analysis, explain what the numbers mean for someone without stats background.
Focus on: what's typical (mean/median), what's the range, and if there are any surprises.
Keep it under 150 words. Be conversational and encouraging.`,

	compare: `You are a friendly statistics teacher. Explain group comparison results.
Given R output comparing two groups, explain: Are they different? How much? Is it meaningful?
Avoid jargon. Use "likely different" or "probably similar" instead of statistical terms.
Keep it under 150 words. Be practical and actionable.`,

	trend: `You are a friendly statistics teacher. Explain trend analysis results.
Given R output about trends, explain: Is it going up or down? How strong is the pattern?
Use plain language. Say "clear upward trend" or "no strong pattern" instead of technical terms.
Keep it under 150 words. Be clear about what the data shows.`,

	correlation: `You are a friendly statistics teacher. Explain correlation results.
Given R output about relationships, explain: Do these things relate? How strongly?
Use analogies when helpful. Avoid "correlation coefficient" - say "relationship strength" instead.
Keep it under 150 words. Be honest about limitations.`,

	distribution: `You are a friendly statistics teacher. Explain distribution results.
Given R output about how data spreads out, explain: Is it balanced? Clustered somewhere? Any outliers?
Use visual language like "bell-shaped" or "leaning right." Be intuitive.
Keep it under 150 words. Help them visualize the data.`
};

export function getExplanationPrompt(template: string): string {
	return EXPLANATION_PROMPTS[template] || EXPLANATION_PROMPTS.summary;
}

/**
 * R Code Templates for webR execution
 */
export const R_TEMPLATES: Record<string, string> = {
	summary: `
data <- read.csv(text="{{DATA}}", stringsAsFactors=FALSE)
nums <- sapply(data, is.numeric)
if(any(nums)) {
    cat("=== SUMMARY STATISTICS ===\\n")
    print(summary(data[, nums]))
    cat("\\n=== STANDARD DEVIATION ===\\n")
    print(sapply(data[, nums], sd, na.rm=TRUE))
} else {
    cat("=== DATA PREVIEW ===\\n")
    print(head(data))
    cat("\\n=== STRUCTURE ===\\n")
    str(data)
}
`,

	compare: `
data <- read.csv(text="{{DATA}}", stringsAsFactors=FALSE)
cat("=== GROUP COMPARISON ===\\n")
if(ncol(data) >= 2) {
    groups <- unique(data[,1])
    cat("Groups found:", length(groups), "\\n")
    print(by(data[,2], data[,1], summary))
    if(length(groups) == 2) {
        cat("\\n=== T-TEST ===\\n")
        g1 <- data[data[,1] == groups[1], 2]
        g2 <- data[data[,1] == groups[2], 2]
        print(t.test(g1, g2))
    }
} else {
    print(summary(data))
}
`,

	trend: `
data <- read.csv(text="{{DATA}}", stringsAsFactors=FALSE)
cat("=== TREND ANALYSIS ===\\n")
if(ncol(data) >= 2) {
    x <- 1:nrow(data)
    y <- as.numeric(data[,2])
    model <- lm(y ~ x)
    cat("Direction:", ifelse(coef(model)[2] > 0, "UPWARD", "DOWNWARD"), "\\n")
    cat("Slope:", round(coef(model)[2], 3), "\\n")
    cat("\\n=== MODEL SUMMARY ===\\n")
    print(summary(model))
}
`,

	correlation: `
data <- read.csv(text="{{DATA}}", stringsAsFactors=FALSE)
cat("=== CORRELATION ANALYSIS ===\\n")
if(ncol(data) >= 2) {
    x <- as.numeric(data[,1])
    y <- as.numeric(data[,2])
    r <- cor(x, y, use="complete.obs")
    cat("Correlation (r):", round(r, 3), "\\n")
    strength <- ifelse(abs(r) > 0.7, "STRONG", ifelse(abs(r) > 0.4, "MODERATE", "WEAK"))
    direction <- ifelse(r > 0, "positive", "negative")
    cat("Interpretation:", strength, direction, "relationship\\n")
    cat("\\n=== TEST SIGNIFICANCE ===\\n")
    print(cor.test(x, y))
}
`,

	distribution: `
data <- read.csv(text="{{DATA}}", stringsAsFactors=FALSE)
cat("=== DISTRIBUTION ANALYSIS ===\\n")
vals <- as.numeric(data[,1])
cat("Count:", length(vals), "\\n")
cat("Range:", min(vals, na.rm=TRUE), "to", max(vals, na.rm=TRUE), "\\n")
cat("IQR:", IQR(vals, na.rm=TRUE), "\\n")
cat("\\n=== QUARTILES ===\\n")
print(quantile(vals, na.rm=TRUE))
cat("\\n=== SKEWNESS CHECK ===\\n")
mean_val <- mean(vals, na.rm=TRUE)
median_val <- median(vals, na.rm=TRUE)
skew <- ifelse(mean_val > median_val, "Right-skewed",
         ifelse(mean_val < median_val, "Left-skewed", "Symmetric"))
cat("Mean:", round(mean_val, 2), "| Median:", median_val, "|", skew, "\\n")
`
};

export function generateRCode(template: string, csvData: string): string {
	const escapedData = csvData.replace(/"/g, '\\"').replace(/\n/g, '\\n');
	return (R_TEMPLATES[template] || R_TEMPLATES.summary).replace('{{DATA}}', escapedData);
}
