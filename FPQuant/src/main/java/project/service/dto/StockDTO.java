package project.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Stock entity.
 */
public class StockDTO implements Serializable {

    private Long id;

    private String sid;

    private String sname;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }
    public String getSname() {
        return sname;
    }

    public void setSname(String sname) {
        this.sname = sname;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StockDTO stockDTO = (StockDTO) o;

        if ( ! Objects.equals(id, stockDTO.id)) { return false; }

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "StockDTO{" +
            "id=" + id +
            ", sid='" + sid + "'" +
            ", sname='" + sname + "'" +
            '}';
    }
}
