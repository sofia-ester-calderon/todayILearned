import React from "react";
import meImage from "../../assets/me.jpg";
import linkedInIcon from "../../assets/linkedin.png";
import githubIcon from "../../assets/github.png";

const AboutMeContainer = () => {
  return (
    <div style={{ margin: "7% 10% 0 10%", textAlign: "left" }}>
      <div className="row">
        <div className="col-4">
          <img src={meImage} width="100%" alt="" />
          <h6 className="mt-2">Questions or comments?</h6>
          <div className="mt-2 mb-2">
            <img
              src={linkedInIcon}
              width="25px"
              height="25px"
              alt=""
              className="mr-2"
            />
            <a
              href="https://www.linkedin.com/in/sofia-calderon-b43310103"
              title="My LinkedIn Profile"
            >
              My LinkedIn Profile
            </a>
          </div>
          <div>
            <img
              src={githubIcon}
              width="25px"
              height="25px"
              alt=""
              className="mr-2"
            />

            <a href="https://github.com/sofia-ester-calderon" title="My Github">
              My Github
            </a>
          </div>
        </div>
        <div className="col-8">
          <p>
            Hi! My Name is Sofia Calderon and I have been a Software Developer
            since 2016. I am originally an architect, but after how learning to
            code in Java and discovering my passion for software development I
            quit my job. And I have never looked back!
          </p>
          <p>
            I was very nervous starting my new career. I was learning so many
            new things every day. At the beginning I thought that was because I
            did not study Computer Science and that some glorious day I would
            keep up with all the CS graduates never ask of google "stupid"
            questions again.
          </p>
          <p>
            But after several years, I relized that the learning curve is still
            as steep. There are new tech stacks to discover, problems I hadn't
            encountered before... Each day I discover one thing I did not know.
            It can be a massive revelation or a just a teeniest thing like a new
            shortcut. And then there are also things I rediscover. I know that I
            had this problem before and solved it, but cannot remember exactly
            how.
          </p>
          <p>
            So I decided to write down each day that thing I learned. It started
            with a few slides and is now this blog. It's mostly for me not to
            have to google things I already knew at some point. But I decided to
            make it public, just in case someone else finds this information
            useful.
          </p>
          <p>Hope you enjoy it!</p>
        </div>
      </div>

      <div style={{ fontSize: "small" }} className="mt-5">
        Icons made by
        <br />
        <a
          href="https://www.flaticon.com/authors/gregor-cresnar"
          title="Gregor Cresnar"
        >
          Gregor Cresnar
        </a>
        {", "}
        <a
          href="https://www.flaticon.com/authors/vitaly-gorbachev"
          title="Vitaly Gorbachev"
        >
          Vitaly Gorbachev
        </a>
        {", "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>
        {", "}
        <a
          href="https://www.flaticon.com/authors/kiranshastry"
          title="Kiranshastry"
        >
          Kiranshastry
        </a>
        {", "}
        <a
          href="https://www.flaticon.com/authors/pixel-perfect"
          title="Pixel perfect"
        >
          Pixel perfect
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};

export default AboutMeContainer;
