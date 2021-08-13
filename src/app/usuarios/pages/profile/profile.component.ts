import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../iniciar-sesion/services/auth.service';
import { ProfileData } from '../../interfaces/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
    `
    .form-profile {
      width: 100%;
      padding: 20px;
      margin: 0 auto;
      padding: 20px 30px;
      background: rgb(245 245 245);
      border: 1px solid rgb(231 231 231);
      border-radius: 6px;
    }
    
    `
  ]
})
export class ProfileComponent implements OnInit, AfterViewInit  {

  dbUser = this.authService.user.user;
  editProfile: ProfileData | any;
  disableAll: boolean = false;
  flag: number = 0;
  profileChanged: boolean = false;

  skills: string[] = [
    "Creativity",
    "Persuation",
    "Collaboration",
    "Adaptability",
    "Decision-Making",
    "Assertive-Communication",
    "Leadership",
    "Self-knowledge",
    "Critical-Thinking",
    "Creative-Thinking"
  ]

  constructor(
    private authService: AuthService
  ) {

  //Desestructuracion de la informacion del usuario traida de la base de datos 
    let {
      cc,
      address,
      dateOfBirth,
      city,
      department,
      country,
      ZIP,
      profession,
      description,
      skills } = this.dbUser.profile;

    //Asignacion de los valores desestructurados al usuario que se enviara a la base de datos
    this.editProfile = {
      name:this.dbUser.name,
      cc,
      address,
      dateOfBirth,
      city,
      department,
      country,
      ZIP,
      profession,
      skills,
      description
    }
  }

  ngOnInit(): void {
  
  }

  /**Funciones que se activan al iniciar el contenido de las vistas */
  ngAfterViewInit(): void{
    this.contarChecks.putActiveFromBd(this.dbUser.profile.skills);
    this.contarChecks.flagGuardian();
  }

  /** FUncion que me permite actualizar el perfil del usuario*/
  sendProfile(formulario) {
    this.authService.userProfile(this.editProfile,this.dbUser.id, localStorage.getItem('provider') || '')
    .subscribe(data =>{
      this.profileChanged = true;
      setTimeout(() => {
        this.profileChanged = false;
      }, 5000);
    })
  }
  
  /**Funcion que toma la fecha del componente de primeng y se la establece al usuario a editar */
  onChangeDate(fecha){
    this.editProfile.dateOfBirth = fecha;
  }

/**Objeto literal que me permite controlar los checkbox
 * @property { function } url - Funcion retorna un array con los checkbox
 * @property { function } true - Funcion suma una habilidad al array de habilidades de usuario
 * @property { function } false - Funcion resta una habilidad al array de habilidades de usuario
 * @property { function } active - Funcion que remueve el atributo disabled a los checkbox
 * @property { function } disable - Funcion que añade el atributo disabled a los checkbox
 * @property { function } putActiveFromBd - Funcion que pone el atributo checkeck del checkbox en true si ya lo tenia el usuario
 * @property { function } flagGuardian - Funcion se fija si ya tiene 3 habilidades seleccionadas al cargar la info del usuario
 * @property { function } null - Funcion de error en caso de que se envie un valor que no valido
 */
  contarChecks = {
    url: () => {
      let checkbox = document.querySelectorAll('.form-check-input');
      return checkbox;
    },
    true: (value: string) => {
      this.flag += 1;
      if(!this.editProfile.skills.includes(value)){
        this.editProfile.skills.push(value)
      };
    },
    false: (checkbox) => {
      this.flag -= 1;
      this.editProfile.skills.splice(this.editProfile.skills.indexOf(checkbox), 1);
    },
    "active": () => {
      this.contarChecks.url().forEach((element: any) => {
        if (!element.checked) {
          element.removeAttribute('disabled');
        };
      });
    },
    "disable": () => {
      this.contarChecks.url().forEach((element: any) => {
        if (!element.checked) {
          element.setAttribute('disabled', 'true');
        };
      });
    },
    putActiveFromBd: (arr)=>{
      this.contarChecks.url().forEach((element: any) => {
        if(arr.includes(element.value)){
          element.checked = true;
          this.contarChecks.true(element.value);
        }
         
      });
    },
    flagGuardian: ()=>{
      if(this.flag > 2){
        return this.contarChecks.disable();
      }
    },
    null: () => this.flag = this.flag
  }

  /**Funcion que se ejecuta cada vez que se selecciona un checkbox */
  seleccionado(checkbox) {
    this.contarChecks[checkbox.target.checked](checkbox.target.value);
    return (this.flag < 3) ? this.contarChecks['active']() : this.contarChecks['disable']()
  }

}
