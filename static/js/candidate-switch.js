$(function() {
  var clinton_data;
  var sanders_data;
  var trump_data;
  var cruz_data;
  var kasich_data;

  var candidate_data;
  $.ajax({
    type: 'get',
    url: '/Qbios',
    success: loadBios
  });

  function loadBios(data) {
    candidate_data = data;
    console.log(candidate_data);

    clinton_data = {
      first_name: candidate_data.candidates[0].first_name,
      last_name: candidate_data.candidates[0].last_name,
      occupation: candidate_data.candidates[0].occupation,
      party: candidate_data.candidates[0].party,
      img: "clinton",
      bio: "&nbsp;&nbsp;&nbsp;&nbsp;Hillary Diane Rodham Clinton (born October 26, 1947) is an American politician and a candidate for the Democratic presidential nomination in the 2016 election. She served as the 67th United States Secretary of State from 2009 to 2013, the junior United States Senator representing New York from 2001 to 2009, First Lady of the United States during the presidency of Bill Clinton from 1993 to 2001, and First Lady of Arkansas for twelve years. <br><br> &nbsp;&nbsp;&nbsp;&nbsp;Hillary Rodham grew up in the Chicago area. She attended Wellesley College, graduating in 1969, and earned a J.D. from Yale Law School in 1973. After serving as a congressional legal counsel, she moved to Arkansas, marrying Bill Clinton in 1975. In 1977, she co-founded Arkansas Advocates for Children and Families. She was appointed the first female chair of the Legal Services Corporation in 1978, and, the following year, became the first woman partner at Rose Law Firm. As First Lady of Arkansas (1979–81, 1983–92), she led a task force whose recommendations helped reform Arkansas' public schools, and served on the boards of corporations including Wal-Mart. <br><br> &nbsp;&nbsp;&nbsp;&nbsp;As First Lady of the United States, Clinton led the failed effort to enact the Clinton health plan of 1993. In 1997 and 1999, she helped create programs for children's health insurance, adoption, and foster care. The only first lady to have been subpoenaed, she faced a federal grand jury in 1996 regarding the Whitewater controversy; no charges were brought against her related to this or any other controversies in her life. Her marriage endured the Lewinsky scandal of 1998, and overall her role as first lady drew a polarized response from the public. <br><br> &nbsp;&nbsp;&nbsp;&nbsp;Clinton was elected in 2000 as the first female senator from New York, the only first lady ever to have sought elective office. Following the September 11 attacks, she voted to approve the war in Afghanistan. She also voted for the Iraq Resolution (which she later regretted), sought to hasten the withdrawal of U.S. troops from Iraq, and opposed the Iraq War troop surge of 2007 (which she later commended). She voted against the tax cuts of 2001 and 2003, and voted against John Roberts and Samuel Alito for the United States Supreme Court, filibustering the latter. She was re-elected to the Senate in 2006. Running for president in 2008, she won far more delegates than any previous female candidate, but lost the Democratic nomination to Barack Obama. <br><br> &nbsp;&nbsp;&nbsp;&nbsp;As Secretary of State in the Obama administration from 2009 to 2013, Clinton responded to the Arab Spring, during which she advocated the U.S. military intervention in Libya. While accepting responsibility for security lapses related to the 2012 Benghazi attack, she said she had no direct role in consulate security prior to that attack. Leaving office after Obama's first term, she authored her fifth book and undertook speaking engagements before announcing her second run for the Democratic nomination, in the 2016 presidential election."
    };

    sanders_data = {
      first_name: candidate_data.candidates[1].first_name,
      last_name: candidate_data.candidates[1].last_name,
      occupation: candidate_data.candidates[1].occupation,
      party: candidate_data.candidates[1].party,
      img: "sanders",
      bio: "&nbsp;&nbsp;&nbsp;&nbsp;Bernard 'Bernie' Sanders (born September 8, 1941) is an American politician and the incumbent junior United States Senator from Vermont. He is a candidate for the Democratic nomination for President of the United States in the 2016 election. A member of the Democratic Party since 2015, Sanders had been the longest-serving independent in U.S. congressional history, though his caucusing with the Democrats entitled him to committee assignments and at times gave Democrats a majority. Sanders became the ranking minority member on the Senate Budget Committee in January 2015; he had previously served for two years as chair of the Senate Veterans' Affairs Committee. A self-proclaimed democratic socialist or social democrat, Sanders is pro-labor and favors greater economic equality.<br><br> &nbsp;&nbsp;&nbsp;&nbsp;Sanders was born and raised in Brooklyn, New York City, and graduated from the University of Chicago in 1964. While a student he was an active civil rights protest organizer for the Congress of Racial Equality and the Student Nonviolent Coordinating Committee. After settling in Vermont in 1968, Sanders ran unsuccessful third-party campaigns for governor and U.S. senator in the early to mid-1970s. As an independent, he was elected mayor of Burlington—Vermont's most populous city—in 1981, where he was reelected three times. In 1990 he was elected to represent Vermont's at-large congressional district in the U.S. House of Representatives. In 1991 Sanders co-founded the Congressional Progressive Caucus. He served as a congressman for 16 years before being elected to the U.S. Senate in 2006. In 2012, he was reelected with 71% of the popular vote.<br><br> &nbsp;&nbsp;&nbsp;&nbsp;Sanders rose to national prominence following his 2010 filibuster against the Middle Class Tax Relief Act of 2010. He favors policies similar to those of social democratic parties in Europe, particularly those instituted by the Nordic countries, and has built a reputation as a leading progressive voice on issues such as campaign finance reform, corporate welfare, global warming, income inequality, LGBT rights, parental leave, and universal healthcare. Sanders has long been critical of U.S. foreign policy and was an early and outspoken opponent of the Iraq War. He is also outspoken on civil liberties and civil rights, particularly criticizing racial discrimination in the criminal justice system as well as advocating for privacy rights against mass surveillance policies such as the USA PATRIOT Act and the NSA surveillance programs."
    };

    trump_data = {
      first_name: candidate_data.candidates[2].first_name,
      last_name: candidate_data.candidates[2].last_name,
      occupation: candidate_data.candidates[2].occupation,
      party: candidate_data.candidates[2].party,
      img: "trump",
      bio: "&nbsp;&nbsp;&nbsp;&nbsp;Donald John Trump (standard pronunciation; born June 14, 1946) is an American businessman, politician, television personality, author, and the presumptive nominee of the Republican Party for President of the United States in the 2016 election. He is chairman of The Trump Organization, which is the principal holding company for his real estate ventures and other business interests.<br><br> &nbsp;&nbsp;&nbsp;&nbsp;Trump worked for his father's real estate development firm while attending college. After graduating from the Wharton School of the University of Pennsylvania in 1968, he joined the company and in 1971 was given control, later renaming it The Trump Organization. He has since built casinos, golf courses, hotels, a New York City neighborhood, and other real estate properties, many of which bear his name, and founded Trump Entertainment Resorts (now owned by Carl Icahn). He has also made branding deals that feature his name on properties in which he has minority ownership or no ownership. Listed by Forbes as one of the world's wealthiest people, Trump and his businesses, as well as his three marriages, have received prominent media exposure. He hosted The Apprentice, a popular NBC reality television show, from 2004 to 2015.<br><br> &nbsp;&nbsp;&nbsp;&nbsp;Trump first campaigned for the U.S. presidency in 2000, and withdrew before any votes were cast, but still won two Reform Party primaries. On June 16, 2015, he again announced his candidacy for president, as a Republican. Trump became known for supporting measures to reduce illegal immigration, for opposing various free-trade agreements that he regards as unfair, for his frequently non-interventionist views on foreign policy, and for his idea to temporarily ban most foreign Muslims from entering the United States until Congress can determine how to address Islamic terrorism. Trump quickly emerged as the front-runner for the Republican nomination. His remarks and positions have inspired protests both opposing and supporting him.<br><br>&nbsp;&nbsp;&nbsp;&nbsp;Trump's victories—culminating with the Indiana primary—led his remaining Republican rivals to suspend their campaigns, whereupon Republican chairman Reince Priebus declared Trump the party's presumptive presidential nominee. A few weeks later, on May 26, 2016, the Associated Press reported that Trump had gained the 1,237 delegates needed to secure the Republican nomination. Trump's name was listed in the Panama Papers leak of 2016."
    };

    cruz_data = {
      first_name: candidate_data.candidates[3].first_name,
      last_name: candidate_data.candidates[3].last_name,
      occupation: candidate_data.candidates[3].occupation,
      party: candidate_data.candidates[3].party,
      img: "cruz",
      bio: "&nbsp;&nbsp;&nbsp;&nbsp;Rafael Edward 'Ted' Cruz (born December 22, 1970) is an American attorney and politician; he was elected in 2012 as the junior United States Senator from Texas.<br><br> &nbsp;&nbsp;&nbsp;&nbsp;Cruz graduated from Princeton University in 1992 and from Harvard Law School in 1995. Between 1999 and 2003, he served in political appointee positions, as the Director of the Office of Policy Planning at the Federal Trade Commission, an Associate Deputy Attorney General at the United States Department of Justice, and domestic policy advisor to George W. Bush on the 2000 George W. Bush presidential campaign. Cruz served as Solicitor General of Texas, from 2003 to 2008, appointed by Texas Attorney General, Greg Abbott. He was the first Hispanic, and the longest-serving, Solicitor General in Texas history. From 2004 to 2009, Cruz was also an adjunct professor at the University of Texas School of Law in Austin, where he taught U.S. Supreme Court litigation.<br><br> &nbsp;&nbsp;&nbsp;&nbsp;Cruz ran for the Senate seat vacated by fellow Republican Kay Bailey Hutchison and, in July 2012, defeated Lieutenant Governor David Dewhurst during the Republican primary runoff, 57%–43%. Cruz defeated former state Representative Paul Sadler in the November 2012 general election, winning 56%–41%. He is the first Hispanic American to serve as a U.S. senator representing Texas, and is one of three senators of Cuban descent. He chairs the Senate Judiciary Subcommittee on Oversight, Federal Rights and Agency Activities and is also the chairman of the Senate Commerce Subcommittee on Space, Science and Competitiveness. In November 2012, he was appointed vice-chairman of the National Republican Senatorial Committee.<br><br>&nbsp;&nbsp;&nbsp;&nbsp;Cruz began campaigning for the Republican presidential nomination in March 2015. During the primary campaign, his base of support had mainly been among social conservatives, though he had crossover appeal to other factions within his party, including libertarian conservatives. His victory in the February 2016 Iowa caucuses marked the first time a Hispanic person won a presidential caucus or primary.<br><br>&nbsp;&nbsp;&nbsp;&nbsp;He suspended his campaign for President on May 3, 2016, after losing the Republican primary in Indiana to Donald Trump."
    };

    kasich_data = {
      first_name: candidate_data.candidates[4].first_name,
      last_name: candidate_data.candidates[4].last_name,
      occupation: candidate_data.candidates[4].occupation,
      party: candidate_data.candidates[4].party,
      img: "kasich",
      bio: "&nbsp;&nbsp;&nbsp;&nbsp;John Richard Kasich (born May 13, 1952) is an American politician, the 69th and current Governor of Ohio, first elected in 2010 and re-elected in 2014.<br><br> &nbsp;&nbsp;&nbsp;&nbsp;Kasich served nine terms as a member of the United States House of Representatives, representing Ohio's 12th congressional district from 1983 to 2001. His tenure in the House included 18 years on the House Armed Services Committee and six years as chairman of the House Budget Committee. He was a key figure in the passage of both welfare reform and the Balanced Budget Act of 1997.<br><br> &nbsp;&nbsp;&nbsp;&nbsp;He was a commentator on Fox News Channel, hosting Heartland with John Kasich from 2001 to 2007. He also worked as an investment banker, serving as managing director of the Lehman Brothers office in Columbus, Ohio.<br><br>&nbsp;&nbsp;&nbsp;&nbsp;In the 2010 Ohio gubernatorial election, Kasich defeated Democratic incumbent Ted Strickland. He was re-elected in 2014, defeating Democrat Ed FitzGerald by 30 percentage points.<br><br>&nbsp;&nbsp;&nbsp;&nbsp;Kasich unsuccessfully sought the Republican nomination for president in 2000 and in 2016."
    };

    console.log("clintonData: ", clinton_data);
    console.log("sandersData: ", sanders_data);
    console.log("trumpData: ", trump_data);
    console.log("cruzData: ", cruz_data);
    console.log("kasichData: ", kasich_data);
  };

  $("#bio-clinton").click(function() {
    $("#candidate_name").html(clinton_data.name);
    $("#candidate_img").attr("src", "../resources/img/"+clinton_data.img+".jpg");
    $("#candidate_bio").html(clinton_data.bio);
  });

  $("#bio-sanders").click(function() {
    $("#candidate_name").html(sanders_data.name);
    $("#candidate_img").attr("src", "../resources/img/"+sanders_data.img+".jpg");
    $("#candidate_bio").html(sanders_data.bio);
  });

  $("#bio-trump").click(function() {
    $("#candidate_name").html(trump_data.name);
    $("#candidate_img").attr("src", "../resources/img/"+trump_data.img+".jpg");
    $("#candidate_bio").html(trump_data.bio);
  });

  $("#bio-cruz").click(function() {
    $("#candidate_name").html(cruz_data.name);
    $("#candidate_img").attr("src", "../resources/img/"+cruz_data.img+".jpg");
    $("#candidate_bio").html(cruz_data.bio);
  });

  $("#bio-kasich").click(function() {
    $("#candidate_name").html(kasich_data.name);
    $("#candidate_img").attr("src", "../resources/img/"+kasich_data.img+".jpg");
    $("#candidate_bio").html(kasich_data.bio);
  });
});
