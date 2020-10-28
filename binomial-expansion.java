import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class KataSolution {
  
  public static double factorial(int n) {
    
    double result = 1;
    
    for (int i = 1; i <= n; i++) result *= i;
    
    return result;
    
  }
  
  public static double binomialCoefficient(int n, int k) {
    
    return factorial(n) / (factorial(k) * factorial(n-k));
    
  }
  
  public static String expand(String expr) {
    
    // Disect expression into necessary variables
    Pattern regExp = Pattern.compile("^\\((-?\\w+)\\+?(-?\\d+)\\)\\^(\\d+)$");
    Matcher matchedExpr = regExp.matcher(expr);
    matchedExpr.matches();
    
    String baseTerm1Pure = matchedExpr.group(1); // All of the first term
    char variable; // Variable of the first term
    double baseTerm1; // Coefficient of the first term
    
    // Separate variable from baseTerm1
    if (baseTerm1Pure.charAt(0) == '-' && baseTerm1Pure.length() == 2) { // If term is "-x"
      
      variable = baseTerm1Pure.charAt(1);
      baseTerm1 = -1;
      
    } else if (baseTerm1Pure.length() == 1 && baseTerm1Pure.matches("[a-zA-Z]")) { // If term is "x"
      
      variable = baseTerm1Pure.charAt(0);
      baseTerm1 = 1;
      
    } else { // If term is anything else
      
      variable = baseTerm1Pure.charAt(baseTerm1Pure.length() - 1);
      baseTerm1 = Double.parseDouble(baseTerm1Pure.substring(0, baseTerm1Pure.length() - 1));
      
    }
    
    double baseTerm2 = Double.parseDouble(matchedExpr.group(2)); // Coefficient of the second term (doesn't have a variable)
    
    final int EXPONENT = Integer.parseInt(matchedExpr.group(3));
    if (EXPONENT == 0) return "1";
    
    String resultTerms = ""; // Gather expanded terms in string
    
    // For every possible term...
    for (int i = 0; i <= EXPONENT; i++) {
      
      int exponent1 = EXPONENT - i;
      int exponent2 = i;
      
      double coefficient = binomialCoefficient(EXPONENT, exponent2);
      
      double term1 = Math.pow(baseTerm1, exponent1);
      double term2 = Math.pow(baseTerm2, exponent2);
      
      double finalCoefficient = coefficient * term1 * term2;
      String strCoefficient = String.format("%.0f", finalCoefficient);
      
      String finalTerm = "";
      
      // Form final version of current expanded term
      if (finalCoefficient != 0) { // No term will be formed if its coefficient is 0
        
        // Handle coefficients
        if (finalCoefficient == 1) {
          
          // Do nothing yet so the term can be x instead of 1x
          
        } else if (finalCoefficient == -1) {
          
          finalTerm += "-"; // Make it so the term is -x instead of -1x
          
        } else { // If the term has a displayable coefficient
          
          finalTerm += finalCoefficient > 0 ? "+" + strCoefficient : strCoefficient; // Add "+" sign to positive coefficients, otherwise just display the coefficient
          if (exponent2 == 0 && finalCoefficient > 0) finalTerm = finalTerm.substring(1); // First term of expansion shouldn't have "+" sign
          
        }
        
        // Handle variables and exponents
        if (exponent1 != 0) { // If variable's exponent is a positive integer
          
          finalTerm += variable; // Display variable
          finalTerm += exponent1 == 1 ? "" : "^" + exponent1; // Unless the variable would be x^1, show its exponent
          
        } else { // If the variable's exponent is zero, the term will be a constant => no variable is added
          
          if (finalTerm.equals("-")) { // If the term is -1, we can now show it as an integer
            
            finalTerm = "-1";
            
          } else if (finalTerm.length() == 0 && finalCoefficient != 0) { // If the term is +1, we can now show it as integer
            
            finalTerm = "+1";
            if (exponent2 == 0) finalTerm = finalTerm.substring(1); // Don't show +1 if the term is the first term
            
          }
          
        }
        
        resultTerms += finalTerm;
        
      }
      
    }
    
    return resultTerms;
    
  }
  
}